<template>
  <page current>
    <ui-cells title="输入框">
        <ui-input label="手机类型" type="phone" v-model="text"></ui-input>
        <ui-input label="邮箱" type="email" v-model="text"></ui-input>
        <ui-input label="普通(带清除)" v-model="text" clear></ui-input>
        <ui-cell>{{text}}</ui-cell>
    </ui-cells>
    <ui-cells title="多项选择">
      <ui-checkbox v-for="item in checkList" v-model="checkItem" :options="item" :checked="checkItem"></ui-checkbox>
      <ui-cell>{{checkItem}}</ui-cell>
    </ui-cells>
    <ui-cells title="单项选择">
      <ui-radio v-for="(item, index) in checkList" v-model="checkRadio" :options="item"></ui-radio>
      <ui-cell>{{checkRadio}}</ui-cell>
    </ui-cells>
    <ui-cells title="多行文本">
      <ui-textarea v-model="textarea" :max="130"></ui-textarea>
    </ui-cells>
    <ui-cells title="多行文本（高度自适应）">
      <ui-textarea v-model="textarea" autoheight placeholder="高度自适应"></ui-textarea>
    </ui-cells>
    <ui-cells title="开关">
        <ui-switch 
        :label="switchDate.label"     
        :disabled="switchDate.disabled"
        :value="switchDate.value"
        v-model="switchItem"></ui-switch>
        <ui-cell>{{switchItem}}</ui-cell>
    </ui-cells>
    <ui-cells title="选择">
      <ui-select label="付款" 
        placeholder="请选择" 
        :options="selectItem"
        v-model="selected"></ui-select>
      <ui-cell>{{selected}}</ui-cell>  
    </ui-cells>
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
        text: 'input同步数据',
        textarea: '',
        checkItem: [],
        checkRadio: [],
        switchItem: '',
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
          value: 'checked01',
          checked: 0,
          disabled: true
        },{
          label: '选项02',
          value: 'checked02',
          checked: 0,
          disabled: false
        },{
          label: '选项03',
          value: 'checked03',
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
