<template>
  <page current>
    <div class="gap-sides mt-10">
      <ui-button @click="toastDefault = true">默认提示</ui-button>
      <ui-button @click="toastSuccess = true">成功提示</ui-button>
      <ui-button @click="toastWarn = true">警告提示</ui-button>
      <ui-button @click="toastError = true">错误提示</ui-button>
      <ui-button @click="toastText = true">文字提示</ui-button>
      <ui-button @click="loading = true">加载提示</ui-button>
      <ui-button type="success" @click="showToastPlugins">提示(插件)</ui-button>
      <ui-button type="success" @click="showLoadingPlugins">加载提示(插件)</ui-button>
    </div>
    <ui-toast v-model="toastDefault" text="默认提示" @on-show="onShowEvent"></ui-toast>
    <ui-toast v-model="toastSuccess" type="success" text="成功提示" @on-show="onShowEvent"></ui-toast>
    <ui-toast v-model="toastWarn" type="warn" text="警告提示" @on-show="onShowEvent"></ui-toast>
    <ui-toast v-model="toastError" type="warn" text="错误提示" @on-show="onShowEvent"></ui-toast>
    <ui-toast v-model="toastText" type="text" text="文字提示" @on-show="onShowEvent"></ui-toast>
    <ui-toast v-model="loading" type="loading" @on-show="onLoadEvent"></ui-toast>
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
        toastDefault: false,
        toastSuccess: false,
        toastWarn: false,
        toastError: false,
        toastText: false,
        loading: false
      }
    },
    methods:{
      onShowEvent(){
        console.log('toast showing');
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
        },3000)
      }
    }
  }
</script>