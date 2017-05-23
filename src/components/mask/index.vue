<template>
  <div :class="[transparent ? 'ui-mask_transparent' : 'ui-mask']" @touchmove.prevent>
  </div>
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
      transparent: Boolean
    },
    methods: {
    }
}
</script>