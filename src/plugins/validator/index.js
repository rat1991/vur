
import {UiToptips} from '@/components/toptips/'
import Validator from './validator'

// class Verification {
//   constructor(options={}){
//     this.config = {}
//     this.options = Object.assign({}, this.config, options)
//     this.invalidEvent = options.invalid || this.invalid
//     this.validEvent = options.valid || this.valid
//     this.validators = []
//   }
//   validator(param){
//     let validator = new Validato({
//       el: param.el,
//       pattern: param.pattern,
//       rules: param.rules,
//       errorMsg: param.errorMsg,
//       successMsg: param.successMsg,
//       invalid(msg, event){
//         this.invalidEvent(msg, event)
//         param.invalid(msg, event)
//       },
//       valid(msg, event){
//         this.validEvent(msg, event)
//         param.valid(msg, event)
//       }
//     });
//     this.validators.unshift(validator)
//   }
//   invalid(){

//   }
// }
export default {
  install (vue, options = {}){
    let $vm, onceEvent
    //定义toptips组件
    const VM = vue.extend(UiToptips)
    $vm = new VM().$mount()
    //保存的验证实例
    let validList = [];
    vue.directive('validator', {
      bind (el, binding, vnode, oldVnode) {
        onceEvent = true;
        document.body.appendChild($vm.$el);
        let param = typeof binding.value === 'function' && binding.value() || binding.value || {};
        Object.assign(param, {el: el, pattern: binding.modifiers})
        //定义每个指令的验证实例
        let validator = new Validator({
          el: param.el,
          pattern: param.pattern,
          rules: param.rules,
          errorMsg: param.errorMsg,
          successMsg: param.successMsg,
          invalid(error, event){
            //显示提示组件
            $vm.state = true
            $vm.type = 'error'
            $vm.text = error
            //添加验证后的样式
            event.input.style.color = '#DD5044'
            event.input.focus()
          },
          onInput(event){
            //清除验证后的样式
            event.input.style.color = ''
          }
        })
        //保存实例，留待全局验证调用
        validList.unshift(validator)
      },
      inserted(el, binding, vnode, oldVnode){
        console.log('inserted');
      },
      update(el, binding, vnode, oldVnode){
        //console.log('update')
      },
      componentUpdated(){
        //console.log('componentUpdated');
      },
      unbind(){
        //解绑时清除验证实例 并 移除提示组件
        validList.pop();
        if(onceEvent){
          onceEvent = false
          document.body.removeChild($vm.$el)
        }
      }
    })
    //全局验证事件：定义$validate执行全局验证
    if (!vue.$validate) {
      vue.prototype.$validate = function(){
        if(validList.length === 0) return;
        let result = true;
        let invalidData = [];
        //返回promise捕获全局是否验证成功
        return new Promise((resolve, reject)=>{
          validList.forEach((cur)=>{
            let validater = cur.validate();
            if(validater && !validater.result){
              result = false
              invalidData.unshift(validater)
            }
            //清除验证后的样式
            cur.input.style.color = cur.value == '' && '';
          })
          result ? resolve($vm) : reject(invalidData)
        })
      }
    }else{
      console.error('vue.$validate already defined')
    }
  }
}