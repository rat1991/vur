<template>
  <label :class="['ui-cell','ui-check-label', {'ui-check-label_disabled': options.disabled}]">
    <div class="ui-cell__bd">
      {{options.label||options.value}}<slot></slot>
    </div>
    <div class="ui-cell__ft">
      <input 
        type="radio" 
        class="ui-check"
        :name="name || options.name"
        :value="options.value"
        :disabled="options.disabled"
        @change="onChange">
      <span class="ui-radio"></span>
    </div>
  </label>
</template>

<script>

export default {
  name: "ui-radio",
  props:{
    name: {
      type: String,
      default: "radio"
    },
    options:{
      type: Object,
      default: function(){
        return {
          label: '单选项',
          value: 'option',
          disabled: false
        }
      }
    },
    count: Array
  },
  methods:{
    onChange: function(event){
      this.$emit('input',event.target.value)
    }
  }
};
</script>