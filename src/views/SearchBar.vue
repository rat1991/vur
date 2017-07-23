<template>
  <page current>
      <ui-search v-model="searchVal" @submit="onSubmit"></ui-search>

      <p>{{searchVal}}</p>
      <ui-footer :link="footlink">Copyright © 2008-2016 weui.io</ui-footer>
  </page>
</template>
<script>
  import Page from '../components/page'
  import UiFooter from '../components/footer'
  import UiSearch from '../components/searchbar'
  
  export default {
    name: 'searchBar',
    data(){
      return {
          searchVal: '',
          footlink: {
              "百度": "//www.baidu.com",
              "QQ": "//www.qq.com",
              "表单页面":"/form"
          }
      }   
    },
    components: {
        Page,
        UiFooter,
        UiSearch,
    },
    methods: {
      onSubmit(val){
        alert('点击提交了:' + val)
      }
    }
  }
</script>