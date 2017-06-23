<template>
  <page current>
    <ui-calendar v-model="date"></ui-calendar>
    <p>{{date}}</p>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiCalendar} from '../components/calendar'
  
  export default {
    name: 'PageCalendar',
    data(){
      return {
        navbar: ['已完成','未完成','已结束','待结束'],
        active: 0,
        date: ''
      }   
    },
    components: {
        Page,
        UiCalendar,
    }
  }
</script>