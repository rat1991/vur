<template>
  <div :class="['ui-tab__content', swiper && 'swiper']" ref="tabContent">
    <section
    :class="['ui-tab__item', current === index && 'ui-tab__item-active']"
    v-for="(item, index) in navbar" :key="index">
      <slot :name="index"></slot>
    </section>
  </div>
</template>
<script>
import Swiper from './swiper'
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
        current: this.value
      }
    },
    computed:{
    },
    created (){
    },
    mounted(){
      let _self = this;
      this.setMinHeight();
      if(this.swiper){
        this.swiperItem = new Swiper({
          containerEl: this.$refs.tabContent,
          item: '.ui-tab__item',
          isScroll: true,
          afterSwipe(event, index){
            _self.current = index
          }
        });
      };
    },
    watch: {
      value(newVal){
        this.current = newVal
      },
      current(newVal){
        this.swiperItem.go(newVal);
        this.$emit('input', newVal);
      }
    },
    methods: {
      setMinHeight(){
        let contentEl = this.$refs.tabContent;
        let contentOffset = contentEl.getBoundingClientRect().top;
        contentEl.style.minHeight = `${document.documentElement.clientHeight - contentOffset}px`
      },
      setSwiper(){
        if(!this.swiper) return;
        return new Swiper({
          containerEl: this.$refs.tabContent,
          item: '.ui-tab__item'
        })
      }
    }
}
</script>