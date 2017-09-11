<template>
  <label class="ui-cell ui-cell_select">
    <div class="ui-cell__hd" v-if="label">
        {{label}}
    </div>
    <div class="ui-cell__bd">
      <select :class="['ui-select', !value && 'text-light', textClass]"
      :name="name"
      :multiple="multiple"
      @change="onChange"
      v-model="selectedDate">
          <option disabled selected value="" v-if="!value && placeholder">{{placeholder}}</option>
          <option v-for="(option, index) in options" :key="index" :value="typeof option === 'string' ? option : option.value">
            {{typeof option === 'string' ? option : option.label}}
          </option>
      </select>
    </div>
  </label>
</template>


<script>
export default {
  name: "ui-select",
  props: {
    textClass: String,
    label: String,
    name: String,
    placeholder: {
      type: String
    },
    value: {
      type: [String, Number],
      default: "请选择"
    },
    multiple: Boolean,
    options: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      selectedDate: this.value ? this.value : ''
    }
  },
  created(){
  },
  watch: {
    value(newVal){
      this.selectedDate = newVal
    },
    selectedDate(newVal){
      this.$emit('input', newVal)
    }
  },
  methods: {
    onChange(){
      this.$emit('change', this.selectedDate)
      console.log('select change')
    }
  }
}
</script>