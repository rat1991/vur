<template>
  <div :class="['ui-grids', type]">
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
      type: String //col, row
    },
    mounted(){
      this.$slots.grid.forEach((item)=>{
        item.elm.style.width = 100 / this.col + '%'
      })
    }
  }
</script>
