<template>
  <ui-msg :type="msgType.type" 
  :title="msgType.title" 
  :text="msgType.text"
  :footerLink="footLink"
  :footerText="footText">
  <div  slot="opr">
    <ui-button type="success" v-if="msgType.type === 'success'">确认</ui-button>
    <ui-button v-if="msgType.type !== 'warn'">返回</ui-button>
  </div>
  </ui-msg>
</template>

<script>
import { UiMsg } from '../components/feedback'
import { UiButton } from '../components/buttons'

export default {
  name: 'feedback',
  components: {UiMsg, UiButton},
  data(){
    return {
      msgData: {
        success: {
          type:'success',
          title: '成功提示页',
          text: '你已经成功进入到成功提示页面'
        },
        error: {
          type:'error',
          title: '错误提示页',
          text: '你已经成功进入到错误提示页面'
        },
        warn: {
          type:'warn',
          title: '警告提示页',
          text: '你已经成功进入到警告提示页面'
        }
      },
      footLink: {'返回上一页':'/feedback'},
      footText: '《vus》基于weui的vue组件库'
    }
  },
  computed: {
    msgType(){
      let typeId = this.$route.params.id;
      let data = {};
      Object.keys(this.msgData).forEach(curType =>{
        if(curType === typeId){
          data.type = this.msgData[curType].type
          data.title = this.msgData[curType].title
          data.text = this.msgData[curType].text
        }
      })
      return data;
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to);
  },
  created() {
  }
}
</script>