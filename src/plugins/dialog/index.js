import {UiDialog} from '../../components/dialog'

export default {
  install (vue, options){
    let $vm, unwatch
    const VM = vue.extend(UiDialog)
    //定义DIAKOG 函数
    function Dialog (opt, type){
      $vm = new VM().$mount()
      this.container = document.querySelector('.container')
      this.container.appendChild($vm.$el)
      //destroy watcher
      unwatch && unwatch()
      $vm.type = type && type
      if(opt.constructor === Object){
        for(let i in opt){
          if(i === "onConfirm" || i === "onCancel") continue;
          $vm[i] = opt[i]
        }
      }
      unwatch = $vm.$watch("state", (newVal) =>{
        if(typeof opt === 'object' && (opt.onShow || opt.onHide)){
          newVal && opt.onShow && opt.onShow($vm)
          !newVal && opt.onHide && opt.onHide($vm)
        }
      })
      $vm.$on('on-confirm', (vm, next) => {
        opt && opt.onConfirm && opt.onConfirm(vm, next)
      })
      $vm.$on('on-cancel', () => {
        opt && opt.onCancel && opt.onCancel()
      })
      $vm.$on('after-leave', () => {
        $vm.$destroy()
        this.container.removeChild($vm.$el)
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
      vue.prototype.$dialog = function(){
        let param = {};
        if(arguments[0].constructor === Object){
          param = arguments[0]
        }else if(typeof arguments[0] === 'string'){
          param.text = arguments[0]
        }
        if(typeof arguments[1] === 'string'){
          param.title = arguments[1]
        }else if(typeof arguments[1] === 'function'){
          param.onConfirm = arguments[1]
        }
        if(typeof arguments[1] === 'string' && typeof arguments[2] === 'function'){
          param.onConfirm = arguments[2]
        }else if(typeof arguments[1] === 'function' && typeof arguments[2] === 'function'){
          param.onCancel = arguments[2]
        }
        new Dialog(param, 'dialog');
      }
    }
    if (!vue.$alert) {
      vue.prototype.$alert = function(){
        let param = {};
        if(arguments[0].constructor === Object){
          param = arguments[0]
        }else if(typeof arguments[0] === 'string'){
          param.text = arguments[0]
        }
        if(typeof arguments[1] === 'string'){
          param.title = arguments[1]
        }else if(typeof arguments[1] === 'function'){
          param.onConfirm = arguments[1]
        }
        if(typeof arguments[1] === 'string' && typeof arguments[2] === 'function'){
          param.onConfirm = arguments[2]
        }
        new Dialog(param, 'alert');
      }
    }
  }
}