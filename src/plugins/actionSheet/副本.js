import UiActionsheet from '../../components/actionsheet'

let $vm
let watcher
let hasWatch = false

export default {
  install (vue, options){
    const ActionSheet = vue.extend(UiActionsheet)
    vue.nextTick(function () {
      if(!$vm) {
        let wrapper = document.querySelector('.container')
        $vm = new ActionSheet({
          el: document.createElement('div')
        })
        $vm.$el.setAttribute('actionSheet', '')
        wrapper.appendChild($vm.$el)
      }
    })
    const actionsheet = {
      show (options) {
        //destroy watcher
        watcher && watcher()
        if(typeof options === 'object'){
          for(let i in options){
            if(i === "onMask") continue;
            $vm[i] = options[i]
          }
        }
        if(typeof options === 'object' && (options.onShow || options.onHide)){
          watcher = $vm.$watch("state", (newVal) =>{
            newVal && options.onShow && options.onShow($vm)
            !newVal && options.onHide && options.onHide($vm)
          })
        }
        if(!hasWatch){
          $vm.$on('on-mask', () => {
            options && options.onMask && options.onMask()
          })
          hasWatch = true
        }
        $vm.state = true;
      },
      hide(){
        $vm.state = false
      }
    }
    //定义插件
    if (!vue.$actionsheet) {
      vue.$actionsheet = actionsheet;
    }
    
    vue.mixin({
      created: function(){
        this.$actionsheet = vue.$actionsheet
      }
    })
  }
}