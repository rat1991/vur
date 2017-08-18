<template>
  <page current>
    <ui-cells>
      <ui-input label="用户名" placeholder="用户名" v-model.trim="username"></ui-input>
      <ui-input label="密码" placeholder="密码" type="password" v-model.trim="password"></ui-input>
    </ui-cells>
    <div class="ui-btn-area">
      <ui-button type="success" @click="onSubmit">登陆</ui-button>
    </div>
    <div class="ui-btn-area">
      <ui-button @click="checkApi">验证api</ui-button>
      <ui-button @click="onClick">上传图片</ui-button>
    </div>
  </page>
</template>
<script>
  import Page from '../../components/page'
  import {UiCells} from '../../components/cell'
  import {UiInput} from '../../components/form'
  import {UiButton} from '../../components/buttons'
  export default {
    name: 'index',
    components: {
      Page,
      UiInput,
      UiCells,
      UiButton
    },
    data(){
      return {
        username: '',
        password: '',
        backUrl: this.$route.query.authBackUrl || '/'
      }
    },
    created(){
      
    },
    methods: {
      onSubmit(){
        this.$store.dispatch('updateAccessToken',{
          grant_type: 'password',
          username: this.username,
          password: this.password
        }).then(res =>{
          console.log(this.backUrl)
          this.$router.push(this.backUrl)
        }).catch(err =>{
          console.error(err)
        })
      },
      checkApi(){
        this.$wx.config(['chooseImage','getLocalImgData']).then(()=>{
          console.log('验证成功')
        }).catch(res =>{
          console.log('验证出错:', res)
        });
      },
      onClick(){
        let _self = this;
        this.$wx.on('chooseImage',{
          count: 1,
          success: (res)=> {
            console.log(res)
          }
        })
      }
    }
  }
</script>