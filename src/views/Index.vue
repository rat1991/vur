<template>
  <page current>
  <ui-grids :col="4">
    <ui-grid slot="grid" v-for="item in menu" :key="item" :to="item.to">
      <i slot="icon" class="icon icon-circle-act"></i>
      <span slot="text">{{item.name}}</span>
    </ui-grid>
  </ui-grids>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiGrids,UiGrid} from '../components/grids'
  export default {
    name: 'index',
    components: {
      Page,
      UiGrids,
      UiGrid
    },
    data(){
      return {
        menu: [
          {name:'cell',to:'/cell'},
          {name:'表单控件',to:'/form'},
          {name:'按钮',to:'/button'},
          {name:'搜索框',to:'/search'},
          {name:'Toast',to:'/toast'},
          {name:'对话框',to:'/dialog'},
          {name:'抽屉栏',to:'/actionsheet'},
          {name:'picker',to:'/picker'},
          {name:'tab',to:'/tab'},
          {name:'轮播',to:'/swiper'},
          {name:'滚动加载',to:'/infinite'},
          {name:'日历',to:'/calendar'},
          {name:'延时加载',to:'/lazyload'},
          {name:'数字键盘',to:'/keypad'},
          {name:'ScrollFix',to:'/scrollfix'}
        ]
      }
    },
    created(){
    }
  }
</script>