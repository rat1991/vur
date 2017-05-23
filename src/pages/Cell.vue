<template>
  <page current>
    <ui-cells title="cell">
      <ui-cell>
      <span slot="hd">头部</span>
      cell
      <span slot="ft">尾部</span>
      </ui-cell>
      <ui-cell access>
      没链接带箭头
      </ui-cell>
      <ui-cell link="//www.baidu.com">
      链接
      <span slot="ft">链接到百度</span>
      </ui-cell>
    </ui-cells>
    <ui-cells title="组件">
      <ui-cell link='/form'>
        from
      </ui-cell>
      <ui-cell link="/button">
        button
      </ui-cell>
      <ui-cell link='/search'>
        searchBar
      </ui-cell>
      <ui-cell link='/toast'>
        toast
      </ui-cell>
      <ui-cell link='/dialog'>
        dialog
      </ui-cell>
      <ui-cell link='/actionsheet'>
        actionsheet
      </ui-cell>
      <ui-cell link='/picker'>
        picker
      </ui-cell>
      <ui-cell link='/tab'>
        tab
      </ui-cell>
      <ui-cell link='/swiper'>
        swiper
      </ui-cell>
      <ui-cell link='/infinite'>
        infinite
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
    }
  }
</script>
