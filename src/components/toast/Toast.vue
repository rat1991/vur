<template>
  <transition name="fade" @after-leave="destroyVm">
    <div :class="['ui-toast', {'ui-toast_text': this.type === 'text'}]" v-if="state">
      <i :class="['ui-toast__icon', toastIcon]" v-if="this.type !== 'loading'"></i>
      <ui-loading class="ui-toast__icon" v-if="this.type === 'loading'"></ui-loading>
      <p class="ui-toast__text">{{type !== 'loading' ? text : loadingText}}<slot></slot></p>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import UiMask from '../mask'
import {UiLoading} from '../loading'
export default {
    name: "ui-toast",
    components:{
      UiMask,
      UiLoading
    },
    props: {
        value: {
          type: Boolean,
          default: false
        },
        type: {
          type: String,
          default: 'default' //default, success, warn, error，text, loading
        },
        text: {
          type: String,
        },
        loadingText: {
          type: String,
          default: "加载中..."
        },
        duration: {
          type: Number,
          default: 2600
        }
    },
    data () {
        return {
          state: false
        }
    },
    created () {
      //定义mask组件
      const VM_Mask = Vue.extend(UiMask);
      this.$mask = new VM_Mask().$mount()
      this.$mask.show = false
      this.$mask.transparent = true
      this.$nextTick(()=>{
        //向Dom插入mask组件
        this.$el.parentNode.insertBefore(this.$mask.$el, this.$el);
      })
      //默认值
      this.state = this.value
    },
    mounted(){
      //this.$el.parentNode.insertBefore($mask.$el, this.$el);
    },
    destroyed(){
      console.log('toast 实例销毁');
    },
    computed: {
        toastIcon(){
          return {
            'icon-sel' : this.type === 'default',
            'icon-circle-success' : this.type === 'success',
            'icon-circle-warn' : this.type === 'warn',
            'icon-circle-error' : this.type === 'error'
          }
        }
    },
    watch: {
      state(newVal){
        this.$emit('input', newVal)
        this.$mask.show = newVal
        if(newVal){
          this.$emit('on-show')
          //定义toast消失事件
          if(this.type !== 'loading'){
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
              this.state = false
            }, this.duration)
          }
        }else{
          this.$emit('on-hide')
        }
      },
      value(newVal){
        this.state = newVal;
      }
  },
  methods: {
    destroyVm(el){}
  }
}
</script>