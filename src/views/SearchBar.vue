<template>
  <page current>
      <ui-search v-model="searchVal" @submit="onSubmit"></ui-search>
      <ui-cells style="margin-top: -1px;" v-show="searchVal">
        <ui-cell dropdown>
            <span slot="bd">筛选条件</span>
            <span slot="ft">{{selectTag}}</span>
            <div slot="dropdown">
              <ui-tag title="搜索类型" :tags="tagsList" v-model="activeTag">
              </ui-tag>
            </div>
          </ui-cell>
      </ui-cells>
      <ui-footer :link="footlink">Copyright © 2008-2016 weui.io</ui-footer>
  </page>
</template>
<script>
  import Page from '@/components/page'
  import UiFooter from '@/components/footer'
  import {UiSearch} from '@/components/searchbar'
  import {UiCells, UiCell} from '@/components/cell'
  import {UiTag} from '@/components/tag'
  
  export default {
    name: 'searchBar',
    components: {
        Page,
        UiFooter,
        UiSearch,
        UiCells, UiCell,
        UiTag
    },
    data(){
      return {
          searchVal: '',
          tagsList: [
            {label: "条件1", value: 'A'},
            {label: "条件2", value: 'B'},
            {label: "条件3", value: 'C'}
          ],
          activeTag: undefined,
          footlink: {
              "百度": "//www.baidu.com",
              "QQ": "//www.qq.com",
              "表单页面":"/form"
          }
      }   
    },
    computed:{
      selectTag(){
        let reVal = []
        this.tagsList.forEach(cur=>{
          if(cur.value === this.activeTag) reVal.push(cur.label);
        })
        return reVal.join('、');
      }
    },
    methods: {
      onSubmit(val){
        alert('点击提交了:' + val)
      }
    }
  }
</script>