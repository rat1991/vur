import {UiToast} from '../../components/toast'

export default {
  install (vue, options){
    let $vm, unwatch
    const VM = vue.extend(UiToast)
    //定义TOAST 函数
    function Toast(opt, type){
      this.options = Object.assign({}, options, opt)
      this.wrapper = document.querySelector('.container')
      this.type    = type
      $vm = new VM().$mount()
      $vm.$el.setAttribute('data-plugins', type)
      this.init();
      this.show();
    }
    //定义DIAKOG 方法
    Toast.prototype = {
      init(){
        var _self = this;
        //destroy watcher
        unwatch && unwatch()
        if(_self.type === 'loading') $vm.type = _self.type
        if(typeof _self.options === 'string'){
          $vm.text = _self.options
        }
        else if(typeof _self.options === 'object'){
          for(let i in _self.options){
            $vm[i] = _self.options[i]
          }
        }
        unwatch = $vm.$watch("state", (newVal) =>{
          //if(!newVal) this.wrapper.removeChild($vm.$el)
          if(typeof _self.options === 'object' && _self.options.onShow || typeof _self.options === 'object' && _self.options.onHide){
            newVal && _self.options.onShow && _self.options.onShow($vm)
            !newVal && _self.options.onHide && _self.options.onHide($vm)
          }
        })
        _self.wrapper.appendChild($vm.$el)
      },
      show(){
        $vm.state = true;
      },
      hide(){
        $vm.state = false
      }
    }
    //定义插件
    if (!vue.$toast) {
      vue.prototype.$toast = function(opt){
        new Toast(opt, 'toast')
      }
    }
    if (!vue.$loading) {
      var toast;
      vue.prototype.$loading = function(opt){
        toast = new Toast(opt, 'loading')
      }
      vue.prototype.$loading['hide'] = function(){
        toast.hide()
      }
    }
  }
}
