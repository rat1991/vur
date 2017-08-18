<template>
  <page current>
    
  </page>
</template>
<script>
import Page from '../../components/page'
export default {
  name: 'authorize',
  components: {
    Page
  },
  beforeRouteLeave(to, from, next){
    this.$loading.hide();
    next();
  },
  created(){
    //缓存返回链接
    let query = this.$route.query;
    localStorage.authBackUrl = query.authBackUrl ? query.authBackUrl : '';

    //执行回调验证
    this.onAccredit()
  },
  mounted(){
    this.$loading();
  },
  methods: {
    onAccredit(){
      this.$http.post('/weixin/authorize/base', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        url: `http://${location.host}${process.env.LOCAL_ROOT}authorizeBack`
      }).then(res =>{
        if(res.data.errcode === 0){
          location.href = res.data.authUrl
        }else{
          console.error('onAccredit', res)
        }
      })
    }
  }
}
</script>
