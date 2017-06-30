<template>
  <div class="ui-keypad">
    <main class="ui-keypad__inner">
      <section class="ui-keypad__panel">
        <span class="ui-keypad__key" 
        v-for="(key, index) in panel" :key="key"
        @click="onKey(key)">{{key}}</span>
        <span class="ui-keypad__key retract"></span>
      </section>
      <section class="ui-keypad__handle">
        <div class="backspace" @click="onBack"></div>
        <div class="confirm">确认</div>
      </section>
    </main>
  </div>
</template>


<script>
export default {
    name: "ui-keypad",
    props: {
      value: String,
    },
    data () {
        return {
          panel: ['1','2','3','4','5','6','7','8','9','.','0'],
          keyValue: []
        }
    },
    computed: {
    },
    created(){
    },
    watch:{
      keyValue(newVal){
        let toString = newVal.join('')
        this.$emit('input',toString)
      }
    },
    methods:{
      onKey(val){
        console.log(val);
        this.keyValue.push(val);
      },
      onBack(){
        this.keyValue.pop()
      },
      onConfirm(){

      }
    }
};
</script>