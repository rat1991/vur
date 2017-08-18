<template>
  <page current>
    <ui-cells class="mt-10">
      <ui-cells class="mt-10">
        <picker-popup label="Picker" :data="pickDate" v-model="choose" placeholder="请选择"></picker-popup>
        <ui-cell>{{choose}}</ui-cell>
        <picker-datetime label="Datetime Picker" placeholder="请选择时间" max="2019-12-31" v-model="selectedDatetime"></picker-datetime>
        <ui-cell>{{selectedDatetime}}</ui-cell>
        <picker-city label="City Picker" v-model="selectedCity"></picker-city>
        <ui-cell>{{selectedCity}}</ui-cell>
      </ui-cells>
    </ui-cells>
  </page>
</template>

<script>
        
        
  import Page from '../components/page'
  import {UiCells, UiCell} from '../components/cell'
  import {UiInput} from '../components/form'
  import {UiButton} from '../components/buttons'
  import {PickerPopup, PickerDatetime, PickerCity} from '../components/picker'
  export default {
    name: 'picker',
    components: {
      Page,
      UiCells, UiCell,
      UiInput,
      UiButton,
      PickerPopup, PickerDatetime, PickerCity
    },
    data () {
      return {
        pickerState: false,
        choose: [],
        selectedCity: [],
        selectedDatetime: [],
        pickDate: [
          ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
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
      showEvent(val){
        //console.log(this.selected);
      }
    }
  }
</script>