<template>
  <div>
      <ui-mask transparent v-if="state"></ui-mask>
      <transition name="fade" @after-leave="destroyVm">
      <div :class="['ui-toast', {'ui-toast_text': this.type === 'text'}]" v-if="state">
        <i :class="['ui-toast__icon', toastIcon]" v-if="this.type !== 'loading'"></i>
        <ui-loading class="ui-toast__icon" v-if="this.type === 'loading'"></ui-loading>
        <p class="ui-toast__text">{{type !== 'loading' ? text : loadingText}}<slot></slot></p>
      </div>
      </transition>
  </div>
</template>

<script>
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
      if (this.value) {
        this.state = true
      }
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
        newVal ? this.$emit('on-show') : this.$emit('on-hide')
        if (newVal && this.type !== 'loading') {
          //延时消息
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.state = false
          }, this.duration)
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