<template>
  <page current></page>
</template>
<script>
import Page from '../../components/page'
export default {
  name: 'authorize',
  components: {
    Page
  },
  data(){
    return {
      code: undefined,
      state: undefined
    }
  },
  beforeRouteEnter (to, from, next) {
    //如果验证后后退回到本页面，就跳转到验证成功页面
    if(from.meta.requiresAuth){
      localStorage.authBackUrl = from.fullPath
      next('/authmsg/success')
    }else{
      next();
    }
  },
  beforeRouteLeave(to, from, next){
    this.$loading.hide();
    next();
  },
  created(){
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    if(!this.code){
      console.error('获取不到回调 code');
      return;
    }
    if(this.state === 'base' || this.state === 'userinfo'){
      this.getAccessToken()
    }else{
      console.error('state error')
    }
  },
  mounted(){
    this.$loading();
  },
  methods: {
    getAccessToken(){
      this.$store.dispatch('getAccessToken',{
        code: this.code,
        state: this.state
      }).then(data=>{
        let backUrl = localStorage.authBackUrl ? localStorage.authBackUrl : '/'
        this.$router.push(backUrl)
      }).catch(res=>{
        if(res.errcode === -2){
          location.href = data.authUrl
        }else{
          console.error(res);
        };
      })
    }
  }
}
</script>
