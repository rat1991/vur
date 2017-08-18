<template>
  <page current>
    <ui-cells title="列表带标题">
      <ui-cell>
      <span slot="hd">头部</span>
      cell
      <span slot="ft">尾部</span>
      </ui-cell>
      <ui-cell access>
      没链接带箭头
      </ui-cell>
      <ui-cell link="/">
      链接
      <span slot="ft">跳转路由</span>
      </ui-cell>
      <ui-cell link="//www.baidu.com">
      链接
      <span slot="ft">链接到百度</span>
      </ui-cell>
    </ui-cells>
    <ui-cells>
      <ui-cell>
      <span slot="hd">列表不带标题</span>
      <span slot="desc">另一行</span>
      </ui-cell>
    </ui-cells>
  </page>
</template>
<script>
import Page from '../components/page'
import {UiCells, UiCell} from '../components/cell'
  
  export default {
    name: 'cell',
    components: {
      Page,
      UiCells,
      UiCell
    },
    created(){
      console.log(new Date('09:30'));
    }
  }
</script>
