<template>
  <div :class="['page',{'page-current': current}]">
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
    },
  }
}
</script>