<template>
  <div>
      <ui-mask v-if="state" @click.native="onMaskClose"></ui-mask>
      <transition name="slideUp" v-on:after-leave="afterLeave">
        <div :class="['ui-actionsheet']" @touchmove.prevent v-show="state">
          <div class="ui-actionsheet__title" v-if="title || subtitle">
            <h4>{{title}}</h4>
            <small>{{subtitle}}</small>
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
  </div>
</template>
<script>
import UiMask from '../mask'
export default {
    name: "ui-actionsheet",
    components:{
        UiMask
    },
    props: {
      title: String,
      subtitle: String,
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
        state: false
      }
    },
    created () {
      if (this.value) {
        this.state = true
      }
    },
    watch: {
      state(newVal){
        this.$emit('input', newVal)
      },
      value(newVal){
        this.state = newVal;
      }
    },
    methods: {
      onMaskClose(){
        if(this.maskClose){
          this.state = false
        }
        this.onMask()
      },
      onMask(){
        this.$emit('on-mask')
      },
      onMenu(event){
        this.state = false
        event()
      },
      afterLeave(){
        this.$emit('after-leave')
      }
    }
}
</script>