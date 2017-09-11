import {UiToptips} from '../../components/toptips'

export default {
  install (vue, options){
    let $vm, unwatch
    const VM = vue.extend(UiToptips)
    
    //定义TOPTIPS 函数
    class Toptips {
      constructor(opts){
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
