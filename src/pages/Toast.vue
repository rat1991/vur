<template>
  <page current>
    <div class="gap-sides mt-10">
      <ui-button @click="showToastDefault">默认提示</ui-button>
      <ui-button @click="showToast">默认提示</ui-button>
      <ui-button @click="showLoading">加载提示</ui-button>
      <ui-button type="success" @click="showToastPlugins">提示(插件)</ui-button>
      <ui-button type="success" @click="showLoadingPlugins">加载提示(插件)</ui-button>
    </div>
    <ui-toast v-model="toast" type="text" text="成功了" @on-show="onShowEvent"></ui-toast>
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
        toast: false,
        loading: false
      }
    },
    methods:{
      showToast(event){
        this.toast = true
      },
      showLoading(){
        this.loading = true
      },
      onShowEvent(){
        console.log("show Event")
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
        },8000)
      }
    }
  }
</script>