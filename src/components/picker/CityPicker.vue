<template>
  <div class="ui-cell-picker">
    <ui-cell access  @click.native="onShowPicker">
      <span slot="hd">{{label}}</span>
      <p :class="['text-' + textAlign]" v-if="value">{{value.join(' ')}}</p>
      <p :class="['text-' + textAlign, 'text-light']" v-else>{{placeholder}}</p>
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
        <ui-picker :pickerData="levelOne" v-model="selectedOne"></ui-picker>
        <ui-picker :pickerData="levelTwo" v-model="selectedTwo"></ui-picker>
        <ui-picker :pickerData="levelThree" v-model="selectedThree"></ui-picker>
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
    value: {
       type: [Array],
       default: ['北京','北京市','东城区']
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
      selectedOne: {},
      selectedTwo: {},
      selectedThree: {},
      selected: [],
      state: false,
    }
  },
  computed: {
  },
  watch: {
    value(newVal){
      console.log('value')
    },
    selectedOne(newVal){
      this.levelTwo = newVal.sub ? newVal.sub : []
    },
    selectedTwo(newVal){
      this.levelThree = newVal.sub ? newVal.sub : []
    },
    selectedThree(newVal){
      let dataArr = [this.selectedOne, this.selectedTwo, newVal];
      let output = dataArr.map(curVal=>{
        return curVal.name
      });
      this.$emit('input',output);
    }
  },
  created(){
    this.setModelVal(0)
  },
  methods: {
    onShowPicker(){
      this.state = true
    },
    setModelVal(n){
     let modelVal = this.value.length !== 0 ? this.value : ['北京','北京市','东城区'];
      switch(n){
        case 0:
        this.levelOne.forEach((cur)=>{
          if(modelVal[0] === cur.name){
            this.selectedOne = cur
            this.levelTwo = cur.sub
          }
        });
        case 1:
        this.levelTwo.forEach((cur)=>{
          if(modelVal[1] === cur.name){
            this.selectedTwo = cur
            this.levelThree = cur.sub
          }
        });
        case 2:
        this.levelThree.forEach((cur)=>{
          if(modelVal[2] === cur.name){
            this.selectedThree = cur
          }
        })
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