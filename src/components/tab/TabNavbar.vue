<template>
  <div class="ui-tab" ref="tab">
    <div
    v-for="(item, index) in navbar" :key="index"
    :class="[current !== index ? 'ui-tab__navbar' : 'ui-tab__navbar-active']"
    :data-index="index"
     @click="onSwitch(index)">
      {{item}}
    </div>
    <div class="ui-tab__slider" ref="slider"></div>
  </div>
</template>
<script>
export default {
    name: "ui-tab-navbar",
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
        this.onSlider(newVal);
      }
    },
    methods: {
      onSwitch(index){
        this.current = index
      },
      onSlider(curVal){
        let navNum = this.navbar.length,
            tabWidth = this.$refs.tab.offsetWidth,
            offset = tabWidth / navNum * curVal;
        this.$refs.slider.style.width =  `${tabWidth / navNum}px`;
        this.$refs.slider.style.transform = `translate3d(${offset}px, 0, 0)`
      }
    }
}
</script>