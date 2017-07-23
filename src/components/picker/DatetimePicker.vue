<template>
  <div class="ui-cell-picker">
    <ui-cell access  @click.native="onShowPicker">
      <span slot="hd">{{label}}</span>
      <p :class="['text-' + textAlign]" v-if="selected">{{selected.join('-')}}</p>
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
        <ui-picker :pickerData="listYear" v-model="selectedYear" divider="-"></ui-picker>
        <ui-picker :pickerData="listMonth" v-model="selectedMonth" divider="-"></ui-picker>
        <ui-picker :pickerData="listDay" v-model="selectedDay"></ui-picker>
      </div>
    </div>
  </div>
</template>

<script>
// <ui-picker :pickerData="listMonth" v-model="selected[1]"></ui-picker>
// <ui-picker :pickerData="listDay" v-model="selected[2]"></ui-picker>
import Moment from 'moment'
import UiMask from '../mask'
import {UiCell} from '../cell'
import UiPicker from './Picker'
export default {
  name: "UiDatetimePicker",
  components:{
    UiMask,
    UiCell,
    UiPicker
  },
  props: {
    model:[String],
    value:[Array],
    max:{
       type: [String],
       default: Moment().format('YYYY-MM-DD')
    },
    min:{
       type: [String],
       default: Moment().subtract(10,'y').format('YYYY-MM-DD')
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
      selectedYear: undefined,
      selectedMonth: undefined,
      selectedDay: undefined,
      state: false,
    }
  },
  computed: {
    listYear(){
      let arrYear = []
      let maxYear = this.toArray(this.max)[0]
      let minYear = this.toArray(this.min)[0]
      for(let i=minYear; i<=maxYear; i++){
        arrYear.push(i.toString())
      }
      return arrYear.reverse()
    },
    listMonth(){
      let arrMonth = []
      let maxDate = this.toArray(this.max)
      let minDate = this.toArray(this.min)
      if(this.selectedYear === maxDate[0]){
        this.getArrVal(1, maxDate[1], arrMonth)
      }else if(this.selectedYear === minDate[0]){
        this.getArrVal(minDate[1], 12, arrMonth)
      }else{
        this.getArrVal(1, 12, arrMonth)
      }
      return arrMonth
    },
    listDay(){
      let arrDay = []
      let selectedDate = `${this.selectedYear}-${this.selectedMonth}`
      let monthRange = Moment(selectedDate).daysInMonth()
      let maxDate = this.toArray(this.max)
      let minDate = this.toArray(this.min)
      if(this.selectedYear === maxDate[0] && this.selectedMonth === maxDate[1]){
        this.getArrVal(1,maxDate[2],arrDay)
      }else if(this.selectedYear === minDate[0] && this.selectedMonth === minDate[1]){
        this.getArrVal(minDate[2],monthRange,arrDay)
      }else{
        this.getArrVal(1,monthRange,arrDay)
      }
      return arrDay
    },
    selected: {
      get(){
         return [this.selectedYear,this.selectedMonth,this.selectedDay]
      },
      set(newValue){
        this.selectedYear = newValue[0]
        this.selectedMonth = newValue[1]
        this.selectedDay = newValue[2]
      }
    }
  },
  watch: {
    selected(newVal){
      this.$emit('input', newVal)
      this.$emit('change', newVal)
    }
  },
  created(){
    this.setDefault()
  },
  methods: {
    getArrVal(min,max,arr){
      for(let i=min; i<= max; i++){
        i = i<10 && typeof i === 'number' ? '0'+i : ''+i
        arr.push(i)
      }
    },
    toArray(datetime){
      return datetime.split('-');
    },
    setDefault(){
      this.selected = this.toArray(Moment().format('YYYY-MM-DD'))
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