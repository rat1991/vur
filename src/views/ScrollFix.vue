<template>
  <page current>
    <ui-cells title="滚动固定">
      <ui-cell>此行不执行</ui-cell>
    </ui-cells>
    <div v-for="cells in 6" :key="cells">
      <ui-cells-title :title="'列表标题'+ cells" v-topfix="options"></ui-cells-title>
      <ui-cells>
        <ui-cell v-for="ctn in 12" :key="ctn">内容{{ctn}}</ui-cell>
      </ui-cells>
    </div>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiCellsTitle, UiCells, UiCell} from '../components/cell'
  
  export default {
    name: 'cell',
    components: {
      Page,
      UiCellsTitle,
      UiCells,
      UiCell
    },
    data(){
      return{
        options: {
          className: 'ui-cells__title_fix'
        }
      }
    }

  }
</script>