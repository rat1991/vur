<template>
  <label :class="['ui-cell','ui-check-label', {'ui-check-label_disabled': options.disabled}]" @change="onChange">
    <div class="ui-cell__hd">
      <input 
        type="checkbox"
        class="ui-check"
        :name="name || options.name"
        :value="options.value"
        :disabled="options.disabled"
        v-model="currentVal">
      <span class="ui-checkbox"></span>
    </div>
    <div class="ui-cell__bd">
      {{options.label||options.value}}<slot></slot>
    </div>
  </label>
</template>

<script>

export default {
  name: "ui-checkbox",
  props:{
    name: {
      type: String,
      default: "checkbox"
    },
    options:{
      type: Object,
      default: function(){
        return {
          label: '选项',
          value: 'option',
          disabled: false
        }
      }
    },
    checked: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  data () {
    return {
      currentVal: []
    }
  },
  created() {
    this.currentVal = this.checked;
  },
  watch:{
    checked(newVal) {
      this.currentVal = newVal;
    }
  },
  methods:{
    onChange: function(event){
      this.$emit('input',this.currentVal)
    }
  }
};
</script>