<template>
  <page current>
    <ui-input v-model="keyValue" type="text" readonly @click.native="showPad = true"></ui-input>
    <ui-keypad v-model="keyValue" :show.sync="showPad" @onConfirm="onCon"></ui-keypad>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiKeypad} from '../components/keypad'
  import {UiInput} from '../components/form'
  export default {
    name: 'swiper',
    components: {
        Page,
        UiInput,
        UiKeypad
    },
    data(){
      return {
        keyValue: '',
        showPad: true
      }   
    },
    methods:{
      onCon(val){
        console.log('提交'+ val);
      }
    }
  }
</script>