<template>
  <div :class="['page', current && 'page-current']"
  :style="{minHeight: winHeight + 'px'}">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'Page',
  props: {
    current: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      winHeight: document.documentElement.clientHeight
    }
  }
}
</script>