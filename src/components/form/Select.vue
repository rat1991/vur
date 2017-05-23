<template>
  <label class="ui-cell ui-cell_select">
    <div class="ui-cell__hd" v-if="label">
        {{label}}
    </div>
    <div class="ui-cell__bd">
      <select :class="['ui-select', value ?  '':'text-light']" :name="name" :value="selectVal" @change="onChange">
          <option value="placeholder" disabled v-if="!!placeholder">{{placeholder}}</option>
          <option v-for="option in options" v-bind:value="option.value">
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
    name: String,
    label: String,
    placeholder: {
      type: String
    },
    value: {
      type: String,
      default: "placeholder"
    },
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectVal(){
        if (this.value === '' && this.placeholder) {
            return 'placeholder'
        }else{
          return this.value
        }
    }
  },
  methods:{
    onChange: function(event){
      this.$emit('input',event.target.value)
      console.log(event.target.value);
    }
  }
}
</script>