<template>
  <page current>
    <ui-swiper :list="list" :height="320" direction="vertical"></ui-swiper>
  </page>
</template>
<script>
  import Page from '../components/page'
  import {UiSwiper} from '../components/swiper'

  export default {
    name: 'swiper',
    data(){
      return {
        list: [
          '//img.zcool.cn/community/0320245591d5052b5b3086ed42e4d63.png',
          '//img.zcool.cn/community/000265591d84bfb5b3086ed47f9918.jpg',
          '//img.zcool.cn/community/032ffbf591e9744a801216a3e7beef7.jpg'
          ]
      }
    },
    components: {
        Page,
        UiSwiper
    }
  }
</script>