<template>
  <transition name="slideUp" v-on:after-leave="afterLeave">
    <div :class="['ui-actionsheet']" @touchmove.prevent v-show="state">
      <div class="ui-actionsheet__title" v-if="title || text">
        <h4>{{title}}</h4>
        <small>{{text}}</small>
      </div>
      <div class="ui-actionsheet__menu">
        <div :class="['ui-actionsheet__cell', item.className]" v-for="item in menus" :key="item.text" @click="onMenu(item.onClick)">
          {{item.text}}
        </div>
      </div>
      <div class="ui-actionsheet__action">
        <div class="ui-actionsheet__cell" @click="state=false">
          {{cancelText}}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import UiMask from '../mask'
export default {
    name: "ui-actionsheet",
    props: {
      title: String,
      text: String,
      menus: {
        type: Array,
        default: ()=>{
          return [
            {
              text: '选项1',
              className: 'text-success',
              onClick(e){
                console.log(e.target.textContent.trim());
              }
            }
          ]
        }
      },
      value: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: "取消"
      },
      maskClose: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        state: this.value
      }
    },
    created () {
      //定义mask组件
      const VM_Mask = Vue.extend(UiMask);
      this.$mask = new VM_Mask().$mount()
      this.$mask.show = false
      this.$mask.onMask = this.onMask
      this.$nextTick(()=>{
        //向Dom插入mask组件
        this.$el.parentNode.insertBefore(this.$mask.$el, this.$el);
      })
    },
    beforeDestroy(){
      this.$mask.$destroy()
      this.$el.parentNode.removeChild(this.$mask.$el)
    },
    watch: {
      state(newVal){
        this.$emit('input', newVal)
        this.$mask.show = newVal
      },
      value(newVal){
        this.state = newVal;
      }
    },
    methods: {
      onMask(){
        if(this.maskClose){
          this.state = false
        }
      },
      onMenu(event){
        this.state = false
        this.$once("after-leave",function(){
          event()
        })
      },
      afterLeave(){
        this.$emit('after-leave')
      }
    }
}
</script>