<template>
  <section class="ui-cell ui-cell_switch">
      <div class="ui-cell__bd">
          {{label}} <slot>{{currentVal}}</slot>
      </div>
      <div class="ui-cell__ft">
          <input 
          type= "checkbox" 
          class= "ui-switch"
          v-model= "currentVal"
          :value= "value"
          :checked= "value"
          :disabled= "disabled">
      </div>
  </section>
</template>

<script>
 export default {
   name: "ui-switch",
   props: {
        label: String,
        disabled: Boolean,
        value: {
            type: Boolean,
            default: false
        },
    },
    data () {
      return {
        currentVal: false
      }
    },
    created() {
        this.currentVal = this.value;
    },
    watch:{
        currentVal(newVal) {
            this.$emit('input', this.currentVal)
        }
    }
 }
</script>