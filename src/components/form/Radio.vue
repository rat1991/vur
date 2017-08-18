<template>
  <label :class="['ui-cell','ui-check-label', disabled && 'ui-check-label_disabled']" :for="id">
    <div class="ui-cell__bd">
      {{label||value}}<slot></slot>
    </div>
    <div class="ui-cell__ft">
      <input 
        type="radio" 
        class="ui-check"
        :id="id"
        :name="name"
        :disabled="disabled"
        :value="value"
        v-model="checkedDate">
      <span class="ui-radio"></span>
    </div>
  </label>
</template>

<script>

export default {
  name: "ui-radio",
  model: {
    prop: 'checked',
    event: 'change'
  },
  props:{
    id: [String, Number],
    name: {
      type: String,
      default: "radio"
    },
    label: {
      type: String,
      default: "单选项"
    },
    value: String,
    disabled: Boolean,
    checked: String
  },
  data(){
    return {
      checkedDate: ''
    }
  },
  watch: {
    checked(newVal){
      this.checkedDate = newVal
    },
    checkedDate(newVal){
      this.$emit('change',newVal)
    }
  }
};
</script>