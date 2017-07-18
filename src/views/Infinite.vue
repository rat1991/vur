<template>
  <page current>
    <ui-cells title="你好" v-infinite="{callback: loadMore, loaded: complete}">
      <ui-cell v-for="(item, index) in list" :key="index">
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
        list: new Array(18),
        count: 0,
        complete: false
      }
    },
    created(){
      console.log(process);
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
          console.log(this.complete, this.count)
        }, 1200);
      }
    }
  }
</script>