<template>
  <div :class="['page', current && 'page-current']">
    <slot></slot>
  </div>
</template>
<style lang="sass">
  @import "./Page";
</style>
<script>
export default {
  name: 'Page',
  props: {
    current: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    clientHeight(){
      return document.documentElement.clientHeight
    }
  }
}
</script>