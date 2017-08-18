<template>
  <transition name="fade" @after-leave="destroyVm">
    <div :class="['ui-dialog']" @touchmove.prevent v-if="state">
      <div class="ui-dialog__hd">
        <strong class="text-18">{{title}}</strong>
        <slot name="title"></slot>
      </div>
      <div class="ui-dialog__bd">
        {{text}}
        <slot></slot>
      </div>
      <div class="ui-dialog__ft">
        <a href="javascript:;" class="ui-dialog__btn" v-if="type !== 'alert'" @click="onCancel">
          {{cancelText}}
        </a>
        <a href="javascript:;" class="ui-dialog__btn text-primary" @click="onConfirm">
          {{confirmText}}
        </a>
        <slot name="opr"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import UiMask from '../mask'
export default {
  name: "ui-confirm",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "confirm" //confirm, alert
    },
    title: {
      type: String,
      default: "提示"
    },
    text: String,
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      state: false
    }
  },
  created() {
    //定义mask组件
    const VM_Mask = Vue.extend(UiMask);
    this.$mask = new VM_Mask().$mount();
    this.$mask.show = false
    this.$nextTick(()=>{
      //向Dom插入mask组件
      this.$el.parentNode.insertBefore(this.$mask.$el, this.$el);
    })
    //state默认值
    this.state = this.value
  },
  watch: {
    state(newVal) {
      this.$emit('input', newVal)
      this.$mask.show = newVal
    },
    value(newVal) {
      this.state = newVal;
    }
  },
  methods: {
    onConfirm() {
      this.state = false
      this.$emit('on-confirm')
    },
    onCancel() {
      this.state = false
      this.$emit('on-cancel')
    },
    destroyVm() {}
  }
}
</script>