<template>
  <div class="ui-tab">
    <div 
    v-for="(item, index) in navbar"
    :class="['ui-tab__navbar', current === index && 'ui-tab__navbar-active']" 
    :data-index="index"
     @click="onSwitch(index)">
      {{item}}
    </div>
    <div class="ui-tab__slider" ref="slider"></div>
  </div>
</template>
<script>
export default {
    name: "ui-tab",
    props: {
      navbar: Array,
      value: {
        type: Number,
        default: 0
      }
    },
    data (){
      return {
        current: null
      }
    },
    created (){
      this.current = this.value
    },
    watch: {
      value(newVal){
        this.current = newVal
      },
      current(newVal){
        this.$emit('input', newVal);
        //滑块滑动
        let navNum = this.navbar.length;
        this.$refs.slider.style.left = (100 / navNum * newVal) + '%';
        this.$refs.slider.style.right = 100 / navNum * (navNum - 1 - newVal) + '%';
      }
    },
    methods: {
      onSwitch(index){
        this.current = index
      }
    }
}
</script>