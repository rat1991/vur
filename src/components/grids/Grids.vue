<template>
  <div class="ui-grids">
      <slot name="grid"></slot>
  </div>
</template>
<script>
  export default {
    name: 'ui-grids',
    props: {
      col: {
        type: Number,
        default: 1
      },
    },
    mounted(){
      this.$slots.grid.forEach((item)=>{
        item.elm.style.width = 100 / this.col + '%'
      })
    }
  }
</script>