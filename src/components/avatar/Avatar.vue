<template>
  <figure 
  :class="['ui-avatar', 
  size === 'xs' || size === 'sm' || size === 'lg' ? `ui-avatar_${size}` : '']" 
  :style="{
    backgroundImage: 'url('+ img +')',
  }"></figure>
</template>
<style lang="sass">
  @import './Avatar.scss'
</style>

<script>
export default {
  name: 'ui-avatar',
  props: {
    img: String,
    size: [String, Array]
  }
}
</script>

