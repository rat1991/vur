<template>
  <page current>
    <img class="img-responsive" v-for="(item, index) in list" :key="index" v-lazy="item">
  </page>
</template>
<script>
  import Page from '../components/page'
  export default {
    name: 'swiper',
    components: {
        Page
    },
    data(){
      return {
        list: [
          '//img.zcool.cn/community/0320245591d5052b5b3086ed42e4d63.png',
          '//img.zcool.cn/community/000265591d84bfb5b3086ed47f9918.jpg',
          '//img.zcool.cn/community/032ffbf591e9744a801216a3e7beef7.jpg',
          '//img.zcool.cn/community/00528c5950c2c4a8012193a3d93730.jpg',
          '//img.zcool.cn/community/005d4d5950bed7a8012193a3793f17.jpg',
          '//img.zcool.cn/community/0065045950ab43a8012193a3e23395.jpg',
          '//img.zcool.cn/community/002b205950a3eda8012193a378ad92.jpg',
          '//img.zcool.cn/community/00635c59509b83a8012193a3484f5a.jpg',
          '//img.zcool.cn/community/00f18859509c87a8012193a3263ced.jpg',
          '//img.zcool.cn/community/00293459549a75a8012193a311086d.jpg',
          '//img.zcool.cn/community/03128905954ba4aa8012193a3070b8f.jpg',
          '//img.zcool.cn/community/0094a35954a5bca8012193a3a2d18b.jpg',
          '//img.zcool.cn/community/003e3d59549076a8012193a359d116.jpg',
          '//img.zcool.cn/community/00317c5954921ba8012193a3096924.jpg'
          ]
      }   
    }
  }
</script>