<template>
  <transition name="">
    <span :class="[
      'ui-badge',
      size !== 'md' && `ui-badge_${size}`,
      type !== 'default' && `ui-badge_${type}`,
      shape !== 'circle' && `ui-badge_${shape}`]" v-show="state">
      {{shape !== 'dot' ? text : ''}}<slot></slot>
    </span>
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
        default: 'default' //success, warn, error
      },
      shape: {
        type: String,
        default: 'circle' // circle, fillet, dot
      },
      size: {
        type: String,
        default: 'md' // md, sm
      },
      value: {
        type: Boolean,
        default: true
      },
    },
    data(){
      return {
        state: this.value === undefined ? true : this.value
      }
    },
    watch: {
      value(newVal){
        this.state = newVal
      },
      state(newVal){
        this.$emit('input', newVal)
      }
    }
}
</script>