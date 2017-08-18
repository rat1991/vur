<template>
  <label class="ui-cell ui-cell_select">
    <div class="ui-cell__hd" v-if="label">
        {{label}}
    </div>
    <div class="ui-cell__bd">
      <select :class="['ui-select', !value && 'text-light']" :name="name" v-model="selectedDate">
          <option value="placeholder" disabled selected v-if="!value && placeholder">{{placeholder}}</option>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
      </select>
    </div>
  </label>
</template>


<script>
export default {
  name: "ui-select",
  props: {
    label: String,
    name: String,
    placeholder: {
      type: String
    },
    value: {
      type: String,
      default: "请选择"
    },
    options: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      selectedDate: this.placeholder ? 'placeholder' : ''
    }
  },
  created(){
    console.log(this.selectedDate);
  },
  watch: {
    value(newVal){
      this.selectedDate = newVal
    },
    selectedDate(newVal){
      this.$emit('input', newVal)
    }
  }
}
</script>