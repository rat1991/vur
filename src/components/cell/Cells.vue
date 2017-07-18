<template>
  <div :class="['ui-cells', className]" ref="cells">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ui-cells',
  props: {
    className: [String, Object, Array],
    title: String
  },
  created(){
    
  },
  mounted(){
    this.addTitle()
  },
  methods: {
    addTitle(){
      if(!this.title) return;
      let cells = this.$refs.cells;
      let titleTpl = `<div class="ui-cells__title">${this.title}</div>`;
      cells.insertAdjacentHTML('beforeBegin', titleTpl);
    }
  }
}
</script>