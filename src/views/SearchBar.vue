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
              "//www.baidu.com": "百度",
              "//www.qq.com": "QQ",
              "/form": "淘宝"
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