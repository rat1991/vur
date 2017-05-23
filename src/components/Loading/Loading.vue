<template>
  <i class="ui-loading" :style="{width: size, height: size}"></i>
</template>
<script>
export default {
  name: "ui-loading",
  props: {
    size: String,
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>