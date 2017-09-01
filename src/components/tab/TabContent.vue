<template>
  <div :class="['ui-tab__content', swiper && 'swiper']">
    <section
    :class="['ui-tab__item', current === index && 'ui-tab__item-active']"
    v-for="(item, index) in navbar" :key="index">
      <slot :name="index"></slot>
    </section>
  </div>
</template>
<script>
import Swiper from '../swiper/swiper.js'
export default {
    name: "ui-tab-content",
    props: {
      navbar: Array,
      value: {
        type: Number,
        default: 0
      },
      swiper: Boolean
    },
    data (){
      return {
        current: null
      }
    },
    created (){
      this.current = this.value
    },
    mounted(){
      if(this.swiper){
        this.tabSwiper = new Swiper({
          container: '.ui-tab__content',
          item: '.ui-tab__item',
          direction: 'horizontal',
          activeClass: 'ui-tab__item-active',
          threshold: 100
        });
        this.tabSwiper.on('swiped', (prev, current)=>{
          this.current = current
        }, false);
      }
    },
    watch: {
      value(newVal){
        this.current = newVal
        if(this.swiper) this.tabSwiper.go(newVal);
      },
      current(newVal){
        this.$emit('input', newVal);
      }
    },
    methods: {
    }
}
</script>