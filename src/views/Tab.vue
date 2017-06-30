<template>
  <page current>
    <ui-tab-navbar :navbar="navbar" v-model="active"></ui-tab-navbar>
    <ui-tab-content :navbar="navbar" v-model="active" :swiper="false">
      <span slot="0">tabcontent01</span>
      <span slot="1">tabcontent02</span>
      <span slot="2">tabcontent03</span>
      <span slot="3">tabcontent04</span>
    </ui-tab-content>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiTabNavbar, UiTabContent} from '../components/tab'
  
  export default {
    name: 'PageTab',
    data(){
      return {
        navbar: ['已完成','未完成','已结束','待结束'],
        active: 0
      }   
    },
    components: {
        Page,
        UiTabNavbar,
        UiTabContent
    }
  }
</script>