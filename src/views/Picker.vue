<template>
  <page current>
    <ui-cells class="mt-10">
      <picker-popup label="Picker" :data="pickDate" v-model="selected" @change="onChange" placeholder="请选择"></picker-popup>
      <ui-cell>{{selected}}</ui-cell>
    </ui-cells>
  </page>
</template>

<script>
// <ui-cells class="mt-10">
//      <ui-popup-picker label="Picker" :data="pickDate" v-model="selected" @change="onChange" placeholder="请选择"></ui-popup-picker>
//      <ui-cell>{{selected}}</ui-cell>
//      <ui-datetime-picker label="Datetime Picker" placeholder="请选择时间" max="2019-12-31" v-model="selectedDatetime"></ui-datetime-picker>
//      <ui-cell>{{selectedDatetime}}</ui-cell>
//      <ui-city-picker label="City Picker" v-model="selectedCity"></ui-city-picker>
//      <ui-cell>{{selectedCity}}</ui-cell>
//     </ui-cells>
  import Page from '../components/page'
  import {UiCells, UiCell} from '../components/cell'
  import {UiInput} from '../components/form'
  import {UiButton} from '../components/buttons'
  import {Picker, PickerPopup, PickerCity, PickerDatetime} from '../components/picker'
//<ui-popup-picker label="Picker" :data="pickDate" v-model="selected" @change="onChange" placeholder="请选择"></ui-popup-picker>
    //  <ui-city-picker label="City Picker" v-model="selectedCity"></ui-city-picker>
    //  <ui-datetime-picker label="Datetime Picker" placeholder="请选择时间" v-model="selectedDatetime"></ui-datetime-picker>
    //  <ui-cell>{{selectedCity}}</ui-cell>
  export default {
    name: 'picker',
    components: {
      Page,
      UiCells, UiCell,
      UiInput,
      UiButton,
      Picker, PickerPopup, PickerCity, PickerDatetime
    },
    data () {
      return {
        pickerState: false,
        selected: [],
        selectedCity: ['广东省','东莞市','石龙镇'],
        selectedDatetime: [],
        pickDate: [
          ['星期一','星期二','星期三','星期四','星期五','星期六','星期七'],
          [{
            name: '早班',
            value: 'a'
          },{
            name: '中班',
            value: 'b'
          },{
            name: '晚班',
            value: 'c'
          }]
          ]
      }
    },
    methods:{
      onChange(val){
        //console.log(this.selected);
      },
      showEvent(val){
        //console.log(this.selected);
      }
    }
  }
</script>