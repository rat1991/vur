<template>
  <label :class="['ui-cell','ui-check-label', {'ui-check-label_disabled': options.disabled}]" :for="id">
    <div class="ui-cell__bd">
      {{options.label||options.value}}<slot></slot>
    </div>
    <div class="ui-cell__ft">
      <input 
        type="radio" 
        class="ui-check"
        :id="id"
        :name="name || options.name"
        :disabled="options.disabled"
        :value="options.value"
        @change="onChange">
      <span class="ui-radio"></span>
    </div>
  </label>
</template>

<script>

export default {
  name: "ui-radio",
  props:{
    id: [String,Number],
    name: {
      type: String,
      default: "radio"
    },
    disabled: Boolean,
    options:{
      type: Object,
      default: function(){
        return {
          label: '单选项',
          value: 'option',
          disabled: false
        }
      }
    }
  },
  data(){
    return {
      checked: false
    }
  },
  methods:{
    onChange: function(event){
      this.$emit('input',event.target.value)
    }
  }
};
</script>