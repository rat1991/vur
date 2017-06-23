<template>
  <page current>
    <div class="gap-sides mt-10">
        <ui-button @click="onAlert">警告框</ui-button>
        <ui-button @click="onDialog">对话框</ui-button>
        <ui-button @click="onAlertPlus" type="success">警告框插件</ui-button>
        <ui-button @click="onDialogPlus" type="success">对话框插件</ui-button>
    </div>

    <ui-dialog
    title="标题" 
    text="自定义内容"
    v-model="showDialog"
    @on-confirm="onClick">
    </ui-dialog>
    
    <ui-dialog
    title="警告" 
    text="自定义内容"
    type="alert"
    v-model="showAlert"
    @on-confirm="onClick">
    </ui-dialog>
  </page>
</template>

<script>
  import Page from '../components/page'
  import {UiButton} from '../components/buttons'
  import {UiDialog} from '../components/dialog'
  
  export default {
    name: 'toast',
    components: {
      Page,
      UiButton,
      UiDialog
    },
    data () {
      return {
        showAlert: false,
        showDialog: false
      }
    },
    methods:{
      onAlert(){
        this.showAlert = true;
        console.log("show Alert");
      },
      onDialog(){
        this.showDialog = true;
        console.log("show Dialog");
      },
      onClick(){
       console.log("点击确认")
      },
      onAlertPlus(){
        this.$alert('这是内容','这是标题党', function(){
          console.log('执行')
        });
      },
      onDialogPlus(){
        this.$dialog('内容内容', function(){
          console.log('kkkkkkk');
        }, function(){
          console.log('laiaidas das ');
        });
      }
    }
  }
</script>