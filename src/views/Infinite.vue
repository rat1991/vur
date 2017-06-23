<template>
  <page current>
    <ui-cells title="你好" v-infinite="[loadMore, complete]">
      <ui-cell v-for="(item, index) in list">
        swiper {{index}}
      </ui-cell>
    </ui-cells>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiCells, UiCell} from '../components/cell'
  import {UiInfinite} from '../components/infinite'
  
  export default {
    name: 'cell',
    components: {
      Page,
      UiCells,
      UiCell,
      UiInfinite
    },
    data(){
      return{
        list: new Array(14),
        count: 0,
        complete: false
      }
    },
    methods: {
      loadMore() {
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.count += 1;
          this.complete = this.count > 2 && true;
        }, 1200);
      }
    }
  }
</script>