require('intersection-observer')
class LazyLoad {
    constructor(options={}){
        this.target = []
        this.container = options.container || window
        this.distance = options.distance || 20
        this.effect = options.effect || true
        this.emptyImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        this.loadImg = options.loadImg || this.emptyImg
        this.errorImg = options.errorImg || this.emptyImg
        this.loadCallback = options.loadCallback
        this.errorCallback = options.errorCallback
        this.status = ['loading', 'loaded', 'error']
        this.lazyQueue = []
        this.io = new IntersectionObserver((entries)=>{
          entries.forEach((entry, index)=>{
            if(entry.isIntersecting){
              this.loadEvent(entry.target)
            }
          })
        });
        //this.inView()
    }
    loadPic(option){
      let el = option.el,
          src = option.src,
          loaded = option.loaded,
          error = option.error;
      let pic = new Image();
      let params = {status: false, width: 0, height: 0};
      pic.src = src
      pic.addEventListener('error', ()=> {
        error && error(params)
      }, false)
      if(pic.complete){
        params.status = true
        params.width = pic.width
        params.height = pic.height
        loaded &&　loaded(params)
      }else{
        pic.addEventListener('load', ()=> {
          params.status = true
          params.width = pic.width
          params.height = pic.height
          loaded &&　loaded(params)
        }, false)
      }
      el.src = src
    }
    init(item){
      let elType = item.el.nodeName.toLowerCase();
      if(elType === 'img'){
        item.el.setAttribute('data-src', item.src)
        this.loadPic({
          el: item.el,
          src: this.loadImg,
          loaded: ()=>{
            console.log(item.el.complete)
            this.io.observe(item.el)
          }
        })
      }
      //this.target.push(item)
    }
    inView(item){
    }
    loadEvent(el){
      this.loadPic({
        el: el,
        src: el.dataset.src,
        loaded: (params)=>{
          el.removeAttribute('data-src')
          if(this.effect){
            el.style.opacity = 0
            setTimeout(() => {
                el.style.opacity = 1
                el.style.transition = 'all 1s ease'
            }, 200)
          }
          this.io.unobserve(el)
          this.errorCallback && this.errorCallback(params)
        }
      })
    }
}

export default {
  install (vue, options = {}){
    let lazyLoad = new LazyLoad(options);
    vue.directive('lazy', {
      bind (el, binding, vnode, oldVnode) {
        
      },
      inserted(el, binding, vnode, oldVnode){
        //console.log('inserted');
        vue.nextTick(()=>{
          lazyLoad.init({el:el, src:binding.value})
        })
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update')
      },
      componentUpdated(){
        //console.log('componentUpdated');
      },
      unbind(){
        //解绑时清除验证实例 并 移除提示组件
      }
    })
  }
}