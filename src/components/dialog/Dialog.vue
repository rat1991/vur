<template>
  <div>
      <transition name="fade">
        <ui-mask v-if="state"></ui-mask>
      </transition>
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
        </div>
      </div>
      </transition>
  </div>
</template>
<script>
import UiMask from '../mask'
export default {
    name: "ui-confirm",
    components:{
        UiMask
    },
    props: {
        title: {
          type: String,
          default: "提示"
        },
        text: String,
        type: {
          type: String,
          default: "confirm"
        },
        value: {
          type: Boolean,
          default: false
        },
        cancelText: {
          type: String,
          default: "取消"
        },
        confirmText: {
          type: String,
          default: "确认"
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
      onConfirm () {
        this.state = false
        this.$emit('on-confirm')
      },
      onCancel () {
        this.state = false
        this.$emit('on-cancel')
      },
      destroyVm(){}
    }
}
</script>