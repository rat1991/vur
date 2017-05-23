<template>
  <div class="ui-swiper" :style="{height: `${height}px`}">
    <section 
    class="ui-swiper__item" 
    v-for="(item, index) in list"
    :style="{backgroundImage: `url(${item})`}">
      <slot :name="index"></slot>
    </section>
  </div>
</template>

<script>
import Swiper from './swiper.js'
export default {
    name: "ui-tab",
    props: {
      list: Array,
      height: Number,
      direction: {
        type: String,
        default: 'horizontal' //滑动方向，默认值vertical；横向滑动时为horizontal
      },
      duration: {
        type: Number,
        default: 300  //滑屏动画时间，单位ms，默认值300；数值越小，滑动越快
      },
    },
    data (){
      return {
        active: null
      }
    },
    mounted(){
      var _self = this;
      new Swiper({
        container: '.ui-swiper',
        item: '.ui-swiper__item',
        direction: _self.direction,
        threshold: 80,
        duration: _self.duration
      });
    },
    watch: {
      active(newVal){
        this.$emit('input', newVal);
      }
    },
    methods: {
      onSwitch(index){
        this.active = index
      }
    }
}
</script>