<template>
  <page current>
    <ui-input v-model="keyValue" readonly></ui-input>
    <ui-keypad v-model="keyValue"></ui-keypad>
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
        keyValue: ''
      }   
    }
  }
</script>