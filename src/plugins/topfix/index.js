import $ from '@/libs/utils'
  /**
   * 滚动固定函数
   * @param options {Object} 参数默认
   * @param options.container {Object} 滚动对象
   * @param options.distance {Number} 距离滚动对象的间隔
   * @param options.className {String} 固定时的样式
   * @returns {null}
   */
class ScrollFix {
  constructor(options = {}){
    this.scroller = options.container || window
    this.distance = options.distance || 0
    this.className = options.className || 'fix-t'
    this.bindEl = []
    this.fixEl = []
  }
  /**
   * 获取固定元素的信息对象，并推入到this.bindEl数组
   * @param el {Object} 固定的DOM元素
   * @param value {Object} vue指令的binding对象的value
   * @returns {null}
   */
  getBindEl(el, value){
    let scrollTop = this.scroller === window ? document.body.scrollTop : this.scroller.scrollTop;
    let bindObj = {};
    bindObj.el = el
    bindObj.offset = el.getBoundingClientRect().top + scrollTop
    bindObj.className = value && value.className || this.className
    bindObj.distance = value && value.distance || this.distance
    bindObj.onFix = value && value.onFix || undefined
    //添加fix元素信息对象
    this.bindEl.push(bindObj)
    //绑定事件
    this.scroller.addEventListener('scroll', this.onScroll.bind(this), false);
  }
  removeBind(){
    //清空绑定元素数组
    this.bindEl = []
    //解绑事件
    this.scroller.removeEventListener('scroll', this.onScroll.bind(this), false);
  }
  onFix(cur, index){
    let className = cur.className || this.className,
        distance = cur.distance || this.distance;
    let elWidth = cur.el.offsetWidth,
        elHeight = cur.el.offsetHeight;
    //定义onfix 信息对象
    let infoObj = {};
    infoObj.index = index
    infoObj.el = cur.el
    infoObj.width = elWidth
    infoObj.height = elHeight
    this.fixEl.unshift(infoObj)
    cur.el.insertAdjacentHTML('afterend', `<div style="height:${elHeight}px"></div>`);
    cur.el.classList.add(className);
    cur.el.style.width = `${elWidth}px`
    cur.el.style.top = `${distance}px`
  }
  unFix(cur){
    let className = cur.className || this.className;
    this.fixEl.shift()
    cur.el.nextElementSibling.remove()
    cur.el.classList.remove(className)
    cur.el.style.width = ''
    cur.el.style.top = ''
  }
  isFixEl(index){
    let vote = this.fixEl.some((cur)=>{
      return cur.index === index
    });
    return vote
  }
  onScroll(){
    let scrollTop = this.scroller === window ? document.body.scrollTop : this.scroller.scrollTop;
    this.bindEl.forEach((cur, index)=>{
      let curEl = cur.el,
          distance = cur.distance || this.distance
      let nearTop = cur.offset - distance - scrollTop;
      if(nearTop <= 0 && !this.isFixEl(index)){
        this.onFix(cur, index)
        cur.onFix && cur.onFix(curEl)
      }else if(nearTop > 0 && this.isFixEl(index)){
        this.unFix(cur)
      }
      //
      if(this.fixEl.length > 0 && this.fixEl[0].index === index - 1){
        let curFixEl = this.fixEl[0].el;
        let fixElHeight = this.fixEl[0].height;
        if(nearTop <= fixElHeight){
          $.debounce(()=>{
            let daff = nearTop - fixElHeight;
            curFixEl.style.transform =`translate3d(0, ${daff}px, 0)`
          }, 20)()
        }else{
          curFixEl.style.transform = ''
        }
        if(this.fixEl.length > 1){
          $.debounce(()=>{
            this.fixEl.forEach((cur, index)=>{
              if(index > 0){
                cur.el.style.transform = `translate3d(0,-${cur.height}px,0)`;
              }
            })
          }, 1000)()

        }
      }
    })
  }
}
export default {
  install (vue, options = {}){
    //创建scrollFix实例
    const scrollFix = new ScrollFix(options);

    vue.directive('topfix', {
      bind (el, binding, vnode, oldVnode) {
        // console.log('bind');
      },
      inserted(el, binding, vnode, oldVnode){
        scrollFix.getBindEl(el, binding.value)
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update');
      },
      componentUpdated(){
        // console.log('componentUpdated');
      },
      unbind(){
        scrollFix.removeBind()
      }
    })
  }
}
