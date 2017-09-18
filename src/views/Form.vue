<template>
  <page current>
    <ui-cells title="输入框">
        <ui-input label="手机类型" type="phone"></ui-input>
        <ui-input label="邮箱" type="email"></ui-input>
        <ui-input label="数字键盘" type="keypad"></ui-input>
        <ui-input label="普通(带清除)" v-model="text" clear></ui-input>
        <ui-cell>{{text}}</ui-cell>
    </ui-cells>
    <ui-cells title="多项选择">
      <ui-checkbox v-for="item in checkList" :key="item.value"
      :label="item.label"
      :value="item.value"
      :checked="item.checked"
      :disabled="item.disabled"
       v-model="checkItem"></ui-checkbox>
      <ui-cell>{{checkItem}}</ui-cell>
    </ui-cells>
    <ui-cells title="单项选择">
      <ui-radio v-for="(item, index) in checkList" :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
       v-model="checkRadio"></ui-radio>
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
    <ui-upload></ui-upload>
  </page>
</template>


<script>
  import Page from '../components/page'
  import {UiCells,UiCell} from '../components/cell'
  import {UiInput,UiCheckbox,UiRadio,UiTextarea,UiSwitch,UiSelect,UiUpload} from '../components/form'

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
      UiTextarea,
      UiUpload
    },
    data () {
      return {
        text: 'input同步数据',
        textarea: '',
        checkItem: [],
        checkRadio: '',
        switchItem: false,
        selectItem: [
          { label: 'One', value: 'A' },
          { label: 'Two', value: 'B' },
          { label: 'Three', value: 'C' }
        ],
        selected: ''
      }
    },
    created() {
      this.checkList = [
        {
          label: '选项01（禁用）',
          value: 'checked01',
          checked: false,
          disabled: true
        },{
          label: '选项02',
          value: 'checked02',
          checked: false,
          disabled: false
        },{
          label: '选项03',
          value: 'checked03',
          checked: true,
          disabled: false
        }
      ];
      this.switchDate = {
        label: '开关',
        value: false,
        disabled: false
      };
    }
  };
</script>