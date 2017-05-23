<template>
  <div class="ui-cell-picker">
    <ui-cell access  @click.native="onShowPicker">
      <span slot="hd">{{label}}</span>
      <p :class="['text-' + textAlign]" v-if="showVal">{{showVal.join(' ')}}</p>
      <p :class="['text-' + textAlign, 'text-light']" v-else="showVal">{{placeholder}}</p>
    </ui-cell>
    <transition name="fade">
      <ui-mask v-show="state" @click.native="onMask"></ui-mask>
    </transition>
    <div :class="['ui-picker', state ? 'ui-picker--active' : '']" @touchmove.prevent>
      <div class="ui-picker__hd">
        <a href="javascript:;" class="ui-picker__action" @click="onCancel">取消</a>
        <a href="javascript:;" class="ui-picker__action" @click="onConfirm">确认</a>
      </div>
      <div class="ui-picker__bd">
        <ui-picker :pickerData="levelOne" v-model="selected[0]" @change="changeOne"></ui-picker>
        <ui-picker :pickerData="levelTwo" v-model="selected[1]" @change="changeTwo"></ui-picker>
        <ui-picker :pickerData="levelThree" v-model="selected[2]"></ui-picker>
      </div>
    </div>
  </div>
</template>

<script>
import UiMask from '../mask'
import {UiCell} from '../cell'
import UiPicker from './Picker'
import CityData from './CityData.json'
export default {
  name: "UiCityPicker",
  components:{
    UiMask,
    UiCell,
    UiPicker
  },
  props: {
    model:[String],  //PCA:省市区
    value: {
       type: [Array],
       default: ['北京','北京市','东城区']
    },
    level: {
       type: [Number],
       default: 3
    },
    label: [String],
    placeholder: [String],
    textAlign: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      levelOne: CityData,
      levelTwo: [],
      levelThree: [],
      selected: [],
      state: false,
    }
  },
  computed: {
    showVal(){
      let showArry = []
      this.selected.forEach((cur)=>{
        showArry.push(cur.name)
      })
      return showArry
    }
  },
  watch: {
    showVal(newVal){
      this.$emit('input', newVal)
    },
    selected(newVal){
      this.$emit('change', newVal)
    }
  },
  created(){
    this.setModelVal(0)
  },
  methods: {
    onShowPicker(){
      this.state = true
    },
    setDefaultVal(){
      this.selected[0] = this.levelOne[0]
      this.levelTwo = this.selected[0].sub
      this.selected[1] = this.levelTwo[0]
      this.levelThree = this.selected[1].sub
      this.selected[2] = this.levelThree[0]
    },
    setModelVal(n){
      let modelVal = this.value
      switch(n){
        case 0:
        this.levelOne.forEach((cur)=>{
          if(modelVal[0] === cur.name){
            console.log('1',modelVal)
            this.selected[0] = cur
            this.levelTwo = cur.sub
          }
        });
        case 1:
        this.levelTwo.forEach((cur)=>{
          if(modelVal[1] === cur.name){
            console.log('2',modelVal)
            this.selected[1] = cur
            this.levelThree = cur.sub
          }
        });
        case 2:
        this.levelThree.forEach((cur)=>{
          if(modelVal[2] === cur.name){
            console.log('3',modelVal)
            this.selected[2] = cur
          }
        })
      }
    },
    changeOne(val){
      if(val.name !== this.value[0]){
        this.levelTwo = val.sub
        this.levelThree = val.sub[0].sub
        this.selected[1] = this.levelTwo[0]
        this.selected[2] = this.levelThree[0]
      }
    },
    changeTwo(val){
      if(val.name !== this.value[1]){
        this.levelThree = val.sub
        this.selected[2] = this.levelThree[0]
      }
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