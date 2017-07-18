<template>
  <transition name="fade">
    <div :class="[transparent ? 'ui-mask_transparent' : 'ui-mask']" @touchmove.prevent></div>
  </transition>
</template>

<style lang="sass">
  @import "./Mask.scss";
</style>


<script>
export default {
    name: "ui-mask",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      transparent: Boolean,
      animation: {
        type:String,
        default: 'fade'
      }
    },
    methods: {
    }
}
</script>