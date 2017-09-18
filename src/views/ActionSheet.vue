<template>
  <page current>
    <div class="gap-sides mt-10">
        <ui-button @click="onShowSheet">ActionSheet</ui-button>
        <ui-button type="success" @click="onActionSheet">ActionSheet插件</ui-button>
        <ui-button type="success" @click="onActionSheetb">ActionSheet插件2</ui-button>
    </div>
    <ui-actionsheet 
     v-model="showActionSheet"
     :maskClose="true"
     title="标题"
     subtitle="说明文字文字"
     :menus="actionMenus"
     @on-mask="test"></ui-actionsheet>
  </page>
</template>

<script>
  import Page from '../components/page'
  import {UiButton} from '../components/buttons'
  import {UiActionsheet} from '../components/actionsheet'
  
  export default {
    name: 'actionsheet',
    components: {
      Page,
      UiButton,
      UiActionsheet
    },
    data () {
      return {
        showActionSheet: false,
        actionMenus: [
          {
            text: "拨打电话",
            className: 'text-success',
            onClick(){
              console.log("拨打电话");
            }
          },
          {
            text: "联系客服",
            onClick(){
              console.log("联系客服");
            }
          }
        ]
      }
    },
    methods:{
      test(){
        console.log("点击了mask");
      },
      onShowSheet(){
        this.showActionSheet = true
      },
      onActionSheet(){
        this.$actionsheet({
          onMask(){
            console.log("click mask")
          },
          menus: [
            {
              text: "插件提示",
              onClick(){
                alert("成功了")
              }
            },{
              text: "插件装置",
              onClick(){
                alert("已卸载")
              }
            }
          ]
        })
      },
      onActionSheetb(){
        this.$actionsheet({
          maskClose: true,
          title: '设置标题',
          text: '点击mark可返回',
          onMask(){
            console.log("click mask")
          },
          menus: [
            {
              text: "删除此条目？",
              onClick: ()=>{
                this.$actionsheet({
                  text: '确认删除？',
                  menus: [
                    {
                      text: "删除",
                      className: 'text-danger',
                      onClick(){
                        alert('删除了')
                      }
                    }
                  ]
                })
              }
            }
          ]
        })
      }
    }
  }
</script>