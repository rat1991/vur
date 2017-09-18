<template>
  <page current>
    <ui-default title="没发现此页面" text="此页面不存在" :links="[
      {
        label:'刷新',
        to: reload
      },{
        label: '返回',
        to: '/'
      }
    ]"></ui-default>
  </page>
</template>
<script>
import Page from '@/components/page'
import {UiCells, UiCell} from '@/components/cell'
import {UiDefault} from '@/components/default'
  
  export default {
    name: 'cell',
    components: {
      Page,
      UiCells,
      UiCell,
      UiDefault
    },
    created(){
    },
    methods: {
      reload(){
        window.location.reload()
      }
    }
  }
</script>