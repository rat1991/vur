<template>
  <section class="ui-cell ui-cell_switch">
      <div class="ui-cell__bd">
          {{label}}
      </div>
      <div class="ui-cell__ft">
          <input
          type= "checkbox"
          class= "ui-switch"
          v-model="currentVal"
          :name="name"
          :disabled= "disabled">
      </div>
  </section>
</template>

<script>
 export default {
   name: "ui-switch",
   props: {
        label: String,
        name: String,
        value: {
            type: [Boolean, Number],
            default: false
        },
        disabled: Boolean,
    },
    data () {
      return {
        currentVal: this.value ? true : false
      }
    },
    created(){
    },
    watch:{
        value(newVal){
            this.currentVal = newVal
        },
        currentVal(newVal) {
            if(typeof this.value === 'number'){
                let outVal = newVal ? 1 : 0;
                this.$emit('input', outVal)
            }else{
                this.$emit('input', newVal)
            }
        }
    }
 }
</script>