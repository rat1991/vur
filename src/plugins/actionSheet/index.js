import {UiActionsheet} from '../../components/actionsheet'


export default {
  install (vue, options){
    let $vm, unwatch, wrapper
    const VM = vue.extend(UiActionsheet)
    //定义ACTIONSHEET 函数
    function ActionSheet(opt){
      if(!$vm) {
        $vm = new VM().$mount()
        $vm.$el.setAttribute('data-plugins', 'actionsheet')
        wrapper = document.querySelector('.container')
        wrapper.appendChild($vm.$el)
      }
      this.options = Object.assign({}, options, opt)
      this.init()
      this.show()
    }
    //定义ACTIONSHEET 方法
    ActionSheet.prototype = {
      init(){
        let _self = this
        //destroy watcher
        unwatch && unwatch()
        if(typeof _self.options === 'object'){
          Object.assign($vm,  _self.options)
        }
        unwatch = $vm.$watch("state", (newVal) =>{
          newVal && _self.options.onShow && _self.options.onShow($vm)
          !newVal && _self.options.onHide && _self.options.onHide($vm)
        })
        $vm.$on('on-mask', () => {
          _self.options && _self.options.onMask && _self.options.onMask()
        })
      },
      show(){
        $vm.state = true;
      },
      hide(){
        $vm.state = false;
      }
    }
    //定义插件
    if (!vue.$actionsheet) {
      let actionsheet
      vue.prototype.$actionsheet = function(opt){
        actionsheet = new ActionSheet(opt)
      }
    }
  }
}