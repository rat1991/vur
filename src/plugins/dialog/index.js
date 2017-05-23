import {UiDialog} from '../../components/dialog'

export default {
  install (vue, options){
    let $vm, unwatch
    const VM = vue.extend(UiDialog)
    //定义DIAKOG 函数
    function Dialog (opt, type){
      $vm = new VM().$mount()
      $vm.$el.setAttribute('data-plugins', type)
      this.wrapper = document.querySelector('.container')
      this.wrapper.appendChild($vm.$el)
      //destroy watcher
      unwatch && unwatch()
      if(type) $vm.type = type
      if(typeof opt === 'string'){
        $vm.text = opt
      }else if(typeof opt === 'object'){
        for(let i in opt){
          if(i === "onConfirm" || i === "onCancel") continue;
          $vm[i] = opt[i]
        }
      }
      unwatch = $vm.$watch("state", (newVal) =>{
        if(!newVal) this.wrapper.removeChild($vm.$el)
        if(typeof opt === 'object' && (opt.onShow || opt.onHide)){
          newVal && opt.onShow && opt.onShow($vm)
          !newVal && opt.onHide && opt.onHide($vm)
        }
      })
      $vm.$on('on-confirm', () => {
        opt && opt.onConfirm && opt.onConfirm()
      })
      $vm.$on('on-cancel', () => {
        opt && opt.onCancel && opt.onCancel()
      })
      this.show()
    }
    //定义DIAKOG 方法
    Dialog.prototype = {
      show(){
        $vm.state = true;
      },
      hide(){
        $vm.state = false
      }
    }
    
    //定义插件
    if (!vue.$dialog) {
      vue.prototype.$dialog = function(opt){
        new Dialog(opt, 'dialog');
        if(typeof arguments[1] === 'string'){
          $vm.title = arguments[1]
        }else if(typeof arguments[1] === 'function'){
          $vm.$on('on-confirm', () => {
            arguments[1]()
          })
        }
        if(typeof arguments[1] === 'string' && typeof arguments[2] === 'function'){
          $vm.$on('on-confirm', () => {
            arguments[2]()
          })
        }else if(typeof arguments[1] === 'function' && typeof arguments[2] === 'function'){
          $vm.$on('on-cancel', () => {
            arguments[2]()
          })
        }
      }
    }
    if (!vue.$alert) {
      vue.prototype.$alert = function(opt){
        new Dialog(opt, 'alert');
        if(typeof arguments[1] === 'string'){
          $vm.title = arguments[1]
          if(typeof arguments[2] === 'function'){
            $vm.$on('on-confirm', () => {
              arguments[2]()
            })
          }
        }else if(typeof arguments[1] === 'function'){
          $vm.$on('on-confirm', () => {
            arguments[1]()
          })
        }
      }
    }
  }
}