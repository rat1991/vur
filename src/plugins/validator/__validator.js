import isLength from 'validator/lib/isLength'
import isEmpty from 'validator/lib/isEmpty'
import isAlpha from 'validator/lib/isAlpha'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
let isChinese = function(str){
  let _reg = /^[\u4e00-\u9fa5]+$/i;
  return _reg.test(str)
};
export default function Validator(el, options = {}){
    this.input = this.getInput(el)
    this.pattern = options.pattern //获取预设规则
    this.rules = options.rules //{min, max, required, ...define}
    this.validMsg = options.successMsg || {}
    this.invalidMsg = options.errorMsg || {}
    this.valid = options.valid
    this.invalid = options.invalid
    this.required = this.rules && this.rules.required || this.input.getAttribute('required') ||  false;
    this.min = this.rules && this.rules.min || this.input.getAttribute('minlength') || 0;
    this.max = this.rules && this.rules.max || this.input.getAttribute('maxlength') || undefined;
    this.validators = this.preset()
    this.validation = []
    this.init()
}
  Validator.prototype = {
      init(){
      // 若input为required推入验证列队
      this.required && this.validation.push('required')
      this.min && this.validation.push('min')
      this.max && this.validation.push('max')
      this.pattern in this.validators && this.validation.push(this.pattern)
      //判定this.rules对象的key为函数时，则为添加自定义规则
      if(this.rules && typeof this.rules === 'object'){
        Object.keys(this.rules).forEach((cur, index)=>{
          if(typeof this.rules[cur] === 'function'){
            let invalidMsg = this.invalidMsg === 'string' && this.invalidMsg || this.invalidMsg[cur] ? this.invalidMsg[cur] : '验证出错'
            let validMsg = this.validMsg === 'string' && this.validMsg || this.validMsg[cur] && this.validMsg[cur]
            this.define(cur, {
              rule: this.rules[cur],
              errorMsg: invalidMsg,
              successMsg: validMsg
            })
            //将自定义规则推入验证列队
            this.validation.push(cur)
          }
        })
      }
      this.input.addEventListener("change", this.proving.bind(this))
    },
    getInput(el){
      if(el.tagName !== 'INPUT'){
        let isInput = el.getElementsByTagName('input');
        if(isInput.length > 0){
          return isInput[0]
        }else{
          console.error('The v-validation element must be input or contains input')
        }
      }else{
        return el
      }
    },
    define(name, options){
      this.validators[name] = {
        rule: options.rule,
        invalidMsg: options.errorMsg,
        validMsg: options.successMsg
      }
    },
    preset(){
      return {
        required: {
          rule(val){
            return !isEmpty(val)
          },
          invalidMsg: '此项为必填'
        },
        min: {
          rule: (val)=>{
            return isLength(val, {min:this.min})
          },
          invalidMsg: `至少为${this.min}个字符`
        },
        max: {
          rule: (val)=>{
            return isLength(val, {max:this.max})
          },
          invalidMsg: `超出范围，至多为${this.max}个字符`
        },
        phone: {
          rule: (val)=>{
            return isMobilePhone(val, 'zh-CN')
          },
          invalidMsg: '输入的不是有效手机号码'
        },
        email: {
          rule: (val)=>{
            return isEmail(val)
          },
          invalidMsg: '您输入的不是有效邮箱'
        },
        chineseName: {
          rule: (val)=>{
            return isChinese(val) && isLength(val, {min:2,max:8})
          },
          invalidMsg: '请输入中文姓名'
        }
      }
    },
    proving(){
      let value = this.input.value;
      for(let item of this.validation){
        let validator = this.validators[item];
        let tipMsg;

        if(validator.rule(value)){
          tipMsg = this.validMsg === 'string' && this.validMsg || this.validMsg[item] ? this.validMsg[item] : validator.validMsg
          this.valid && this.valid(tipMsg, this.input)
        }else{
          tipMsg = this.invalidMsg === 'string' && this.invalidMsg || this.invalidMsg[item] ? this.invalidMsg[item] : validator.invalidMsg
          this.invalid && this.invalid(tipMsg, this.input)
          break
        }
      }
    }
  }