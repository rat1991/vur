<template>
  <page current>
    <ui-cells title="你好">
      <ui-cell link='/form'>
        <span slot="hd">01</span> <p>from</p>
        <span slot="ft">kk</span>
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
