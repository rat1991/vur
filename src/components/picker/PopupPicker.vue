<template>
  <div class="ui-cell-picker">
    <ui-cell access  @click.native="onShowPicker">
      <span slot="hd">{{label}}</span>
      <p slot="bd" :class="['text-' + textAlign]" v-if="showVal">{{showVal}}</p>
      <p slot="bd" :class="['text-' + textAlign, 'text-light']" v-else>{{placeholder}}</p>
    </ui-cell>
    <transition name="fade">
      <ui-mask :show="state" @click.native="onMask"></ui-mask>
    </transition>
    <div :class="['ui-picker', state ? 'ui-picker--active' : '']" @touchmove.prevent>
      <div class="ui-picker__hd">
        <a href="javascript:;" class="ui-picker__action" @click="onCancel">取消</a>
        <a href="javascript:;" class="ui-picker__action" @click="onConfirm">确认</a>
      </div>
      <div class="ui-picker__bd">
        <ui-picker v-for="(list, i) in data" :picker-data="list" :key="i" v-model="selected[i]" @change="onChange"></ui-picker>
      </div>
    </div>
  </div>
</template>

<script>
import UiMask from '../mask'
import {UiCell} from '../cell'
import UiPicker from './Picker'
export default {
  name: "UiPopupPicker",
  components:{
    UiMask,
    UiCell,
    UiPicker
  },
  props: {
    data: [Array],
    value:[Array],
    label: [String],
    placeholder: [String],
    textAlign: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      state: false,
      //计算selected的监听次数，忽略获取数据时的change状态
      calc: 0,
      loop: this.data.length,
      isDefault: false,
      selected: []
    }
  },
  computed: {
    showVal(){
      let showArry = []
      this.selected.forEach((cur)=>{
        let curVal = (typeof cur === 'object') ? cur.name : cur
        showArry.push(curVal)
      })
      if(this.calc === 0 && this.value.length > 0) this.isDefault = true
      if(this.calc <= this.loop && !this.isDefault) showArry = []
      return showArry.join(' ')
    }
  },
  watch: {
    value(newVal){
      this.selected = newVal
    },
    state(newVal){
      if(this.calc === this.loop)  this.calc += 1;
      if(newVal){
        this.$emit('on-show', this.selected)
      }else{
        this.$emit('on-hide', this.selected)
      }
    },
    selected(newVal){
      this.$emit('input', newVal)
      this.calc += 1
      if(this.calc > this.loop){
        this.$emit('change', newVal)
      }
    }
  },
  created(){
    this.setModelVal()
  },
  methods: {
    setModelVal(){
      let modelVal = this.value
      for(var i=0; i < this.data.length; i++){
        let dataType = typeof this.data[i][0] === 'object'
        this.data[i].forEach((cur)=>{
          let curVal = dataType ? cur.name : cur
          if(modelVal[i] === curVal){
            this.selected[i] = dataType ? {name:cur.name,value:cur.value} : cur
          }
        })
      }
    },
    onChange(val){
      console.log(val);
    },
    onShowPicker(){
      this.state = true
    },
    onConfirm () {
      this.state = false
      this.$emit('on-confirm')
    },
    onCancel () {
      this.state = false
      this.$emit('on-cancel')
    },
    onMask () {
      this.state = false
      this.$emit('on-mask')
    }
  }
}
</script>