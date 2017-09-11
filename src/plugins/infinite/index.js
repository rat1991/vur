import {UiInfinite} from '../../components/infinite'
import $ from '../../libs/utils'

class Infinite {
  constructor(options ={}){
    this.container = options.container || window
    this.distance = options.distance || 20
    this.handle = options.handle
    this.complete = options.complete
    this.clientHeight = document.documentElement.clientHeight
    this.scrollTop = undefined
    this.scrollHeight = undefined
    this.loading = true
    this.scrollEvet = $.debounce(this.isInFoot, 100).bind(this)
    this.init()
  }
  init(){
    this.container.addEventListener('scroll', this.scrollEvet, false);
  }
  isInFoot(){
    this.scrollTop = this.container === window ? document.body.scrollTop : this.container.scrollTop
    this.scrollHeight = document.documentElement.scrollHeight
    let offset = this.scrollHeight - (this.clientHeight + this.scrollTop);
    if(this.loading && offset < this.distance && typeof this.handle === 'function'){
      this.loading = false
      this.handle().then((state)=>{
        this.setComplete(state)
      })
    }
  }
  setComplete(state){
    this.loading = state ? false : true
    if(state){
      this.complete && this.complete();
      this.unbind();
    }
  }
  unbind(){
    this.container.removeEventListener('scroll', this.scrollEvet, false);
  }
}
export default {
  install (vue, options){
    const VM = vue.extend(UiInfinite);
    let infinites = [];
    vue.directive('infinite', {
      bind (el, binding, vnode, oldVnode) {
        let infinite;
        let $vm = new VM().$mount();
        let isload = binding.arg === 'load';
        let param = {}; //container, distance, handle, complete
        if(typeof binding.value === 'function'){
          param['handle'] = binding.value
          param['complete'] = function(){
            $vm.loading = false
          }
        }else if(binding.value.constructor === Object){
          param = binding.value
          param['complete'] = function(){
            $vm.loading = false
            binding.value.complete && binding.value.complete()
          }
        }
        vue.nextTick(()=>{
          el.parentNode.insertBefore($vm.$el, el.nextSibling)
          param.handle().then(complete =>{
            if(complete === null){
              $vm.state = false;
              return
            }else if(complete) {
              $vm.loading = false
              return
            };
            infinite= new Infinite(param)
            infinites.push(infinite)
          })
        })
      },
      update(el, binding, vnode, oldVnode){
        //将Infinite组件绑定到DOM
        //console.log('update')
      },
      unbind(){
        //解绑时清除验证实例 并 移除提示组件
        if(infinites.length > 0){
          infinites[0].unbind()
          infinites.shift()
        }
      }

    })
  }
}
