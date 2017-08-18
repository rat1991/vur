<template>
  <div class="ui-grids__item" @click="onClick">
      <slot name="icon"></slot>
      <slot name="text"></slot>
  </div>
</template>
<script>
  import $ from '../../libs/utils.js';
  export default {
    name: 'ui-grids',
    props:{
      to: String,
    },
    methods: {
      onClick () {
        $.url(this.to, this.$router)
      }
    }
  }
</script>