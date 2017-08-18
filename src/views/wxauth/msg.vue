<template>
  <ui-msg :type="msgType.type" 
  :title="msgType.title" 
  :text="secs + msgType.text"
  :footerLink="footLink"
  :footerText="footText">
  <div slot="opr">
    <ui-button v-if="msgType.type !== 'success'" link="/">返回</ui-button>
  </div>
  </ui-msg>
</template>

<script>
import { UiMsg } from '../../components/feedback'
import { UiButton } from '../../components/buttons'

export default {
  name: 'feedback',
  components: {UiMsg, UiButton},
  data(){
    return {
      msgData: {
        success: {
          type:'success',
          title: '你已成功授权',
          text: '秒后将自动返回到上一页'
        },
        error: {
          type:'error',
          title: '错误提示页',
          text: '你已经成功进入到错误提示页面'
        },
        warn: {
          type:'warn',
          title: '没有权限',
          text: '您没有权限查看该页面'
        }
      },
      footLink: {'返回主页':'/'},
      footText: '《vus》基于weui的vue组件库',
      backUrl:  localStorage.authBackUrl ? localStorage.authBackUrl : '/',
      secs: 5
    }
  },
  computed: {
    msgType(){
      let typeId = this.$route.params.id;
      let data = {};
      Object.keys(this.msgData).forEach(curType =>{
        if(curType === typeId){
          data = this.msgData[curType]
        }
      })
      return data;
    }
  },
  beforeRouteLeave(to, from, next){
    if(to.path === '/authorizeBack'){
      next(backUrl)
    }else{
      next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('before', to);
  },
  mounted(){
    if(this.msgType.type === 'success'){
      this.timer = setInterval(()=>{
        --this.secs
      }, 1000)
    }
  },
  watch: {
    secs(newVal){
      if(newVal === 0){
        clearInterval(this.timer)
        this.$router.replace(this.backUrl)
      }
    }
  }
}
</script>