<template>
  <page current>
    <ui-cells title="列表带标题" :link="{label:'导航链接', to: titleLink}">
      <ui-cell>
      <span slot="hd">头部</span>
      <span slot="bd">中部</span>
      <span slot="ft">尾部</span>
      </ui-cell>
      <ui-cell access>
      没链接带箭头
      </ui-cell>
      <ui-cell to="/">
      链接
      <span slot="ft">跳转路由</span>
      </ui-cell>
      <ui-cell to="//www.baidu.com">
      链接
      <span slot="ft">链接到百度</span>
      </ui-cell>
      <ui-cell dropdown>
        <span slot="bd">点击查看更多</span>
        <div slot="dropdown">
          这是隐藏内容这是隐藏内容这是隐藏内容这是隐藏内容这是隐藏内容这是隐藏内容这是隐藏内容这是隐藏内容这是隐藏内容
        </div>
      </ui-cell>
    </ui-cells>
    <ui-cells>
      <ui-cell>
      <span slot="hd">列表不带标题</span>
      <span slot="desc">另一行</span>
      </ui-cell>
    </ui-cells>
    <ui-cells>
      <ui-cell :swipe="[
        {label:'取消关注', to: onSwipe},
        {label:'删除', to: onSwipe, type: 'danger'}
      ]">
      <span slot="bd">swipeCell</span>
      <span slot="ft">2018-02-15</span>
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
    },
    methods: {
      onSwipe(){
        alert('点击了')
      },
      titleLink(){
        alert('cells-title 操作')
      }
    }
  }
</script>
