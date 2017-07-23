<template>
  <page current>
    <div class="gap-sides mt-10">
      <ui-button v-for="item in toast" :key="item.type" @click="onToastBtn(item.type)">{{item.text}}</ui-button>
      <ui-button type="success" @click="showToastPlugins">提示(插件)</ui-button>
      <ui-button type="success" @click="showLoadingPlugins">加载提示(插件)</ui-button>
    </div>
    <ui-toast v-model="toastState" :type="toastType" :text="toastText" @on-show="showToast(toastText)" @on-hide="hideToast(toastText)"></ui-toast>
  </page>
</template>

<script>
  import Page from '../components/page'
  import {UiButton} from '../components/buttons'
  import {UiToast, UiToastLoading} from '../components/toast'
  
  export default {
    name: 'toast',
    components: {
      Page,
      UiButton,
      UiToast,
      UiToastLoading
    },
    data () {
      return {
        toast: {
          default: {
            type: 'default',
            text: '默认提示'
          },
          success: {
            type: 'success',
            text: '成功提示'
          },
          warn: {
            type: 'warn',
            text: '警告提示'
          },
          error: {
            type: 'error',
            text: '错误提示'
          },
          text: {
            type: 'text',
            text: '文字提示'
          }
        },
        toastState: false,
        toastType: '',
        toastText: ''
      }
    },
    methods:{
      onToastBtn(type){
        this.toastType = type
        this.toastText = this.toast[type].text
        this.toastState = true
      },
      showToast(text){
        console.log('show'+ text)
      },
      hideToast(text){
        console.log('hide'+ text)
      },
      onLoadEvent(){
        console.log("show loading Event")
        setTimeout(()=>{
          this.loading = false
        }, 3000)
      },
      showToastPlugins(event){
        this.$toast({
          text: 'momo',
          type: 'warn'
        });
      },
      showLoadingPlugins(event){
        var _self = this;
        this.$loading();
        setTimeout(()=>{
          _self.$loading.hide();
        },30000)
      }
    }
  }
</script>