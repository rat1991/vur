<template>
  <div class="ui-cells" :class="[{'title': title}, className]" :data-title="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ui-cells',
  props: {
    className: [String, Object, Array],
    title: String
  }
}
</script>