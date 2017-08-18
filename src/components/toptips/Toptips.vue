<template>
  <transition name="slideDown">
    <div :class="['ui-toptips',type !== 'default' && `ui-toptips_${type}`]" v-show="state">
      {{text}}<slot></slot>
    </div>
  </transition>
</template>

<script>
import $ from '@/libs/utils'
export default {
    name: "ui-toptips",
    props: {
      text: String,
      type: {
        type: String,
        default: 'default' //success, warn、error
      },
      value: Boolean,
      duration: {
        type: Number,
        default: 2400
      }
    },
    data(){
      return {
        state: false
      }
    },
    watch: {
      value(newVal){
        this.state = newVal
      },
      state(newVal){
        if(newVal){
          $.debounce(()=>{
            this.state = false
          },this.duration)()
        }
        this.$emit('input', newVal)
      }
    }
}
</script>