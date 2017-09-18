<template>
  <page current>
    <ui-cells title="badge">
      <ui-cell>
        <span slot="bd">默认</span>
        <ui-badge slot="ft">12</ui-badge>
      </ui-cell>
      <ui-cell>
        <span slot="bd">成功</span>
        <ui-badge slot="ft" type="success">12</ui-badge>
      </ui-cell>
      <ui-cell>
        <span slot="bd">提示（shape="fillet"）</span>
        <ui-badge slot="ft" type="warn" shape="fillet">12</ui-badge>
      </ui-cell>
      <ui-cell>
        <span slot="bd">警告（shape="circle"）</span>
        <ui-badge slot="ft" type="error">12</ui-badge>
      </ui-cell>
      <ui-cell>
        <span slot="bd">提示dot（shape="dot"）<ui-badge shape="dot"></ui-badge></span>
      </ui-cell>
    </ui-cells>
  </page>
</template>
<script>
import Page from '@/components/page'
import {UiCells, UiCell} from '@/components/cell'
import {UiBadge} from '@/components/badge'
  
  export default {
    name: 'cell',
    components: {
      Page,
      UiCells,
      UiCell,
      UiBadge
    },
    created(){
    },
    methods: {
    }
  }
</script>