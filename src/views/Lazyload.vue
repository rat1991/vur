<template>
  <page current>
    <div class="article">
      <h2>最难挖的阿里人和最好挖的百度人</h2>
      <p>阿里巴巴员工：我感觉我是在为自己做事，不是为公司。</p>
      <p>阿里巴巴是所有互联网巨头中最喜欢给员工灌输价值观、营造企业文化的公司。“江湖”传言阿里的人，工程师都被洗脑，很多猎头也表示阿里的人最难挖。马云一直强调要有自己的DNA，同时也强调value的重要性，同时有一句话让人关注，一万人的believe就是信仰。他能把自己的梦想和价值观源源不断地灌输给你，用其“扭曲磁场”使得你产生认同并与之共同努力。对于不懂技术的领导者而言，他不会跟你坐下来讨论技术问题或者产品问题，他更像是一种精神存在，一盏指明灯，告诉你要往哪里走。这样的文化收获了什么？某位阿里员工表示：“阿里巴巴也没有宗教式的崇拜，我们崇拜的是自己，崇拜自己的事业。”阿里员工难挖，很重要的一点是因为他们认为在阿里是在为自己做事情，当然，阿里巴巴工资高也是不争的事实。</p>
    </div>
    <img class="img-responsive" v-for="(item, index) in list" :key="index" v-lazy="item">
  </page>
</template>
<style lang="scss" scoped>
  @import "../style/common";
  .article{
    padding: $gap-20 $gapSides;
    >h2{
      padding: $gap-30 0;
    }
    p{
      font-size: 16px;
      line-height: 1.8;
      margin-bottom: 10px;
    }
  }
</style>

<script>
import Page from '../components/page'
export default {
  name: 'swiper',
  components: {
    Page
  },
  data() {
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