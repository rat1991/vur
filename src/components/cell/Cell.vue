<template>
  <section :class="[
    'ui-cell', {'ui-cell_access': access || to}, 
    dropdown && 'ui-cell_dropdown', 
    dropdownState && 'open', 
    swipe && 'ui-cell_swipe']"
   @click="onClick">
    <slot></slot>
    <div :class="['ui-cell__icon', iconSize]" v-if="icon">
      <i :class="['icon', icon, iconClass]"></i>
    </div>
    <div class="ui-cell__hd" v-if="slothd && !dropdown && !swipe">
      <slot name="hd"></slot>
    </div>
    <div class="ui-cell__bd" v-if="slotbd && !dropdown && !swipe">
      <slot name="bd"></slot>
    </div>
    <div class="ui-cell__ft"  v-if="slotft && !dropdown && !swipe">
      <slot name="ft"></slot>
    </div>
    <div class="ui-cell__desc" v-if="!swipe && slotdesc">
      <slot name="desc"></slot>
    </div>

    <div class="ui-cell__bd" v-if="dropdown">
      <section class="ui-cell" @click="onDropdown">
        <div class="ui-cell__hd" v-if="slothd">
          <slot name="hd"></slot>
        </div>
        <div class="ui-cell__bd" v-if="slotbd">
          <slot name="bd"></slot>
        </div>
        <div class="ui-cell__ft"  v-if="slotft">
          <slot name="ft"></slot>
        </div>
      </section>
      <div :class="['ui-cell_dropdown__content']" v-show="dropdownState">
        <section class="ui-cell" v-if="slotContent">
          <div class="ui-cell__bd">
            <slot name="dropdown"></slot>
          </div>
        </section>
      </div>
    </div>
    <div class="ui-cell__bd" v-if="swipe" ref="swiperCell">
      <section class="ui-cell">
        <div class="ui-cell__hd" v-if="slothd">
          <slot name="hd"></slot>
        </div>
        <div class="ui-cell__bd" v-if="slotbd">
          <slot name="bd"></slot>
        </div>
        <div class="ui-cell__ft"  v-if="slotft">
          <slot name="ft"></slot>
        </div>
      </section>
    </div>
    <div class="ui-cell__ft" v-if="swipe" ref="swiperMenu">
      <div :class="['ui-cell_swipe__btn', item.type && `bg-${item.type}`]" v-for="(item, index) in swipe" :key="index" @click="onSwiperMenu(item.to)">{{item.label}}</div>
    </div>
  </section>
</template>

<script>
  import $ from '../../libs/utils.js';
  export default {
    name: 'ui-cell',
    props: {
      value: Boolean,
      access: {
        type: Boolean,
        default: false
      },
      dropdown: Boolean,
      swipe: [Object, Array],
      to: [String, Object,Function],
      icon: String,
      iconSize: String, //xs, sm, md, lg
      iconClass: String,
    },
    data(){
      return {
        dropdownState: this.value,
      }
    },
    computed: {
      slothd: function(){
        return this.$slots.hd;
      },
      slotbd: function(){
        return this.$slots.bd;
      },
      slotft: function(){
        return this.$slots.ft;
      },
      slotdesc: function(){
        return this.$slots.desc;
      },
      slotContent: function(){
        return this.dropdown && this.$slots.dropdown;
      }
    },
    watch: {
      value(newVal){
        this.dropdownState = newVal
      },
      dropdownState(newVal){
        this.$emit('input', newVal)
      }
    },
    mounted(){
      this.swipe && this.swiperCell()
    },
    methods: {
      onSwiperMenu(val){
        typeof val === 'function' && val()
        typeof val === 'string' && $.url(val, this.$router)
      },
      swiperCell(){
        let cellEl = this.$refs.swiperCell;
        let maxX = this.$refs.swiperMenu.offsetWidth;
        let startTime, moveTime, endTime, startX, moveX, endX;
        let isTransform = false;
        function setTranslateX(el, ratio){
          el.style.transform = `translate3d(${ratio}px, 0, 0)`
        }
        cellEl.addEventListener('touchstart', (e)=>{
          if(isTransform){
            setTranslateX(cellEl, 0)
            return
          }
          startTime = e.timeStamp;
          startX = e.changedTouches[0].pageX
          console.log(maxX);
        }, false);
        cellEl.addEventListener('touchmove', (e)=>{
          if(isTransform) return;
          moveTime = e.timeStamp;
          moveX = e.changedTouches[0].pageX
           let offset =  moveX - startX;
          if(offset < 0 && Math.abs(offset) < maxX + 20){
            cellEl.style.transition = ''
            setTranslateX(cellEl, offset)
          }
        }, false)
        cellEl.addEventListener('touchend', (e)=>{
          if(isTransform){
            isTransform = false;
            return
          };
          endTime = e.timeStamp;
          endX = e.changedTouches[0].pageX
          cellEl.style.transition = 'all .4s ease-out'
          if(endTime - startTime < 120 && startX - endX > 20 || startX - endX > maxX){
            setTranslateX(cellEl, -maxX)
            isTransform = true
          }else{
            setTranslateX(cellEl, 0)
          }
          
        })
      },
      onDropdown(){
        this.dropdownState = !this.dropdownState
      },
      onClick () {
        if(typeof this.to === 'function'){
          this.to()
        }else{
          $.url(this.to, this.$router)
        }
      }
    }
  }
</script>