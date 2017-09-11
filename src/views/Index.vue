<template>
  <page current>
  <ui-grids :col="4">
    <ui-grid slot="grid" v-for="item in menu" :key="item.name" :to="item.to">
      <i slot="icon" class="icon icon-circle-act"></i>
      <span slot="text">{{item.name}}</span>
    </ui-grid>
  </ui-grids>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiGrids, UiGrid} from '../components/grids'
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
          {name:'列表',to:'/cell'},
          {name:'表单控件',to:'/form'},
          {name:'表单验证',to:'/formValidation'},
          {name:'按钮组件',to:'/button'},
          {name:'搜索框',to:'/search'},
          {name:'toast提示',to:'/toast'},
          {name:'对话框',to:'/dialog'},
          {name:'抽屉',to:'/actionsheet'},
          {name:'选择器',to:'/picker'},
          {name:'tab切换',to:'/tab'},
          {name:'滑动轮播',to:'/swiper'},
          {name:'滚轮加载',to:'/infinite'},
          {name:'日历',to:'/calendar'},
          {name:'图片懒加载',to:'/lazyload'},
          {name:'数字键盘',to:'/keypad'},
          {name:'滚动固定',to:'/scrollfix'},
          {name:'反馈页面',to:'/feedback'}
        ]
      }
    },
    created(){
    }
  }
</script>