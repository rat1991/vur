<template>
  <page current>
    <ui-calendar></ui-calendar>
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
        active: 0
      }   
    },
    components: {
        Page,
        UiCalendar,
    }
  }
</script>