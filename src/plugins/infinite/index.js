import {UiInfinite} from '../../components/infinite'

class Infinite {
  constructor(options ={}){
    this.container = options.container || window
    this.distance = options.distance || 20
    this.event = options.event
    this.handle = options.handle
    this.clientHeight = options.clientHeight
    this.scrollTop = undefined
    this.scrollHeight = undefined
    this.loading = true
    this.scrollEvet = this.onScroll.bind(this)
    this.init()
  }
  init(){
    this.container.addEventListener('scroll', this.scrollEvet, false);
  }
  onScroll(){
    let _self = this;
    _self.scrollTop = _self.container === window ? document.body.scrollTop : _self.container.scrollTop
    _self.scrollHeight = document.documentElement.scrollHeight
    let offset = _self.scrollHeight - (_self.clientHeight + _self.scrollTop);
    if(_self.loading && offset < _self.distance && typeof _self.event === 'function'){
      _self.loading = false
      _self.event().then((complete)=>{
        _self.onComplete(complete)
      })
    }
  }
  onComplete(state){
    this.loading = state ? false : true
    if(state && typeof this.handle === 'function'){
      this.handle();
      this.container.removeEventListener('scroll', this.scrollEvet, false);
    }
  }
}
export default {
  install (vue, options){
    let $vm;
    const VM = vue.extend(UiInfinite);
    let clientHeight = document.documentElement.clientHeight;
    vue.directive('infinite', {
      bind (el, binding, vnode, oldVnode) {
        $vm = new VM().$mount();
        vue.nextTick(function () {
          let elPosition = el.getBoundingClientRect().bottom;
          el.parentNode.insertBefore($vm.$el, el.nextSibling)
          $vm.state = elPosition > clientHeight ? true : false
        })
        if(typeof binding.value === 'function'){
          new Infinite({
            clientHeight: clientHeight,
            event: binding.value,
            handle(){
              $vm.loading = false
            }
          })
        }
      },
      inserted(el, binding, vnode, oldVnode){
        //console.log('inserted');
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update:');
      },
      componentUpdated(){
        //console.log('componentUpdated');
      }

    })
  }
}
