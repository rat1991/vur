<template>
  <div :class="['ui-cells', className]" ref="cells">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import CellsTitle from './CellsTitle'
export default {
  name: 'ui-cells',
  props: {
    className: [String, Object, Array],
    align: {
      type: String
    },
    title: String,
    link: Object
  },
  created(){

  },
  mounted(){
    this.$nextTick(()=>{
      this.addTitle();
      this.alignHd();
    })
  },
  watch: {
    link(newVal){
      this.$title.link = newVal
    }
  },
  methods: {
    addTitle(){
      if(!this.title || this.$el.previousElementSibling && this.$el.previousElementSibling.classList.contains('ui-cells__title')) return;
       const VM_TITLE = Vue.extend(CellsTitle);
       this.$title = new VM_TITLE().$mount()
       this.$title.title = this.title
       this.$title.link = this.link
       this.$el.parentNode.insertBefore(this.$title.$el, this.$el);
    },
    alignHd(){
      if(this.align){
        let hdArry = this.$el.querySelectorAll('.ui-cell__hd');
        if(hdArry.length < 1) return;
        let max = hdArry[0].offsetWidth;
        for(let i=1; i<hdArry.length; i++){
          let curWidth = hdArry[i].offsetWidth;
          if(curWidth > max){
            max = curWidth
          }
        }
        hdArry.forEach(cur=>{
          cur.style.cssText += `; width: ${max + 2}px; text-align:${this.align}`
        })
      }
    }
  }
}
</script>