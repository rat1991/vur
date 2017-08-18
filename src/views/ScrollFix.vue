<template>
  <page current>
    <ui-cells title="滚动固定">
      <ui-cell>此行不执行</ui-cell>
    </ui-cells>
    <div v-for="cells in 10" :key="cells">
      <ui-cells-title :title="'列表标题'+ cells" v-topfix="options"></ui-cells-title>
      <ui-cells>
        <ui-cell v-for="ctn in list" :key="ctn">{{ctn}}</ui-cell>
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
        list: ['内容01','内容02','内容03','内容04','内容05','内容06','内容07'],
        options: {
          className: 'ui-cells__title_fix',
          onFix(el){
            console.log('top',el)
          }
        }
      }
    }

  }
</script>