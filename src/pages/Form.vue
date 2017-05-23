<template>
  <page current>
    <ui-cells :title="text">
        <ui-input label="手机类型" type="phone" v-model="text" clear=""></ui-input>
        <ui-input label="邮箱" type="email" v-model="text"></ui-input>
        <ui-input label="普通" v-model="text"></ui-input>
    </ui-cells>
    <ui-cells>
      <ui-checkbox v-for="item in checkList" v-model="checkItem" :options="item" :checked="checkItem"></ui-checkbox>
      <ui-radio v-for="item in checkList" v-model="checkItem" :options="item"></ui-radio>
    </ui-cells>
    <p>{{checkItem}}</p>
    <ui-textarea v-model="text" :max="30"></ui-textarea>
    <p>{{text}}</p>
    <ui-cells>
        <ui-switch 
        :label="switchDate.label"     
        :disabled="switchDate.disabled"
        :value="switchDate.value"
        v-model="switchItem"></ui-switch>
        <ui-select label="付款" 
        placeholder="请选择" 
        :options="selectItem"
        v-model="selected"
        ></ui-select>
    </ui-cells>
    <p>{{selected}}</p>
    <p>{{switchItem}}</p>
  </page>
</template>


<script>
  import Page from '../components/page'
  import {UiCells,UiCell} from '../components/cell'
  import {UiInput,UiCheckbox,UiRadio,UiTextarea,UiSwitch,UiSelect} from '../components/form'

  export default {
    components:{
      Page,
      UiInput,    
      UiCells,
      UiCell,
      UiCheckbox,
      UiRadio,
      UiSwitch,
      UiSelect,
      UiTextarea
    },
    data () {
      return {
        checkItem: [],
        switchItem: '',
        text: '050505',
        selectItem: [
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ],
        selected: ''
      }
    },
    created() {
      this.checkList = [
        {
          label: '选项01',
          value: 'b01',
          checked: 0,
          disabled: true
        },{
          label: '选项02',
          value: 'b02',
          checked: 0,
          disabled: false
        },{
          label: '选项03',
          value: 'b03',
          checked: 1,
          disabled: false
        }
      ];
      let self = this;
      this.checkList.map(function(cur,i){
        if(cur.checked === 1){
          self.checkItem.push(cur.value);
        }
      });
      this.switchDate = {
          label: '开关',
          value: false,
          disabled: false
      };
    }
  };
</script>
