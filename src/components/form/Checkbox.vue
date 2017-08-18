<template>
  <label :class="['ui-cell','ui-check-label', disabled && 'ui-check-label_disabled']">
    <div class="ui-cell__hd">
      <input 
        type="checkbox"
        class="ui-check"
        :name="name"
        :value="value"
        :disabled="disabled"
        v-model="checkedDate">
      <span class="ui-checkbox"></span>
    </div>
    <div class="ui-cell__bd">
      {{label||value}}<slot></slot>
    </div>
  </label>
</template>

<script>

export default {
  name: "ui-checkbox",
  model: {
    prop: 'checkedList',
    event: 'change'
  },
  props:{
    label: {
      type: String,
      default: '选项'
    },
    value: String,
    name: {
      type: String,
      default: 'checkbox'
    },
    checked: Boolean,
    disabled: Boolean,
    checkedList: Array
  },
  data () {
    return {
      checkedDate: []
    }
  },
  created() {
    this.checkedDate = this.checkedList;
    this.checked && this.checkedDate.push(this.value)
  },
  watch:{
    checkedList(newVal){
      this.checkedDate = newVal
    },
    checkedDate(newVal){
      this.$emit('change',newVal)
    }
  }
};
</script>