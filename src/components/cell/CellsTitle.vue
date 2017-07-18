<template>
  <div class="ui-cells__title">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'ui-cells-title',
  props: {
    title: String,
    className: [String, Object, Array],
  }
}
</script>