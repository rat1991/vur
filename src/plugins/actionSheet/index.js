import {UiActionsheet} from '../../components/actionsheet'


export default {
  install (vue, options){
    const VM = vue.extend(UiActionsheet)
    let $vm;
    //定义ACTIONSHEET 函数
    function ActionSheet(opt){
      $vm = new VM().$mount()
      this.container = document.querySelector('.container')
      this.options = Object.assign($vm, options, opt)
      this.unwatch = false
      this.init()
      this.show()
    }
    //定义ACTIONSHEET 方法
    ActionSheet.prototype = {
      init(){
        this.container.appendChild($vm.$el)
        //destroy watcher
        this.unwatch && this.unwatch()

        this.unwatch = $vm.$watch("state", (newVal) =>{
          newVal && this.options.onShow && this.options.onShow($vm)
          !newVal && this.options.onHide && this.options.onHide($vm)
        })
        $vm.$on('on-mask', () => {
          this.options && this.options.onMask && this.options.onMask()
        })
        $vm.$on('after-leave', () => {
          $vm.$destroy()
          this.container.removeChild($vm.$el)
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
      vue.prototype.$actionsheet = function(opt){
        new ActionSheet(opt)
      }
    }
  }
}