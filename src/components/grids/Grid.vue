<template>
  <div class="ui-grids__item" @click="onClick">
      <slot name="icon"></slot>
      <slot name="text"></slot>
  </div>
</template>
<script>
  import {go} from '../../libs/util_url.js';
  export default {
    name: 'ui-grids',
    props:{
      to: String,
    },
    methods: {
      onClick () {
        go(this.to, this.$router)
      }
    }
  }
</script>