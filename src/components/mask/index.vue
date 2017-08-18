<template>
  <transition name="fade">
    <div :class="[transparent ? 'ui-mask_transparent' : 'ui-mask']" v-if="show"
     @touchmove.prevent
     @click="onMask"></div>
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
        default: true
      },
      transparent: Boolean,
      animation: {
        type:String,
        default: 'fade'
      }
    },
    methods: {
      onMask(){}
    }
}
</script>