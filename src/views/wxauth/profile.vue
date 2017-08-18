<template>
  <page current>
    <ui-cells>
      <ui-cell>
      <ui-avatar :img="userinfo.headImgUrl" slot="hd"></ui-avatar>
        {{userinfo.nickName}}
      </ui-cell>
    </ui-cells>
    <div class="ui-btn-area">
      <ui-button type="success" @click="onClick">上传图片</ui-button>
    </div>
    <p>
    <img :src="chooseImageID" class="img-responsive">
    </p>
  </page>
</template>
<script>
  import Page from '../../components/page'
  import {UiCells, UiCell} from '../../components/cell'
  import {UiAvatar} from '../../components/avatar'
  import {UiButton} from '../../components/buttons'
  export default {
    name: 'index',
    components: {
      Page,
      UiCells,
      UiCell,
      UiAvatar,
      UiButton
    },
    data(){
      return {
        chooseImageID: ''
      }
    },
    computed: {
      userinfo(){
        return this.$store.state.userinfo
      }
    },
    created(){
      
    },
    methods: {
      onClick(){
        console.log('点击按钮')
        let _self = this;
        this.$wx.on('chooseImage',{
          count: 1,
          success: (res)=> {
            console.log(res)
            _self.$wx.on('getLocalImgData',{
              localId: res.localIds[0],
              success(res){
                _self.chooseImageID = res.localData
              }
            })
          }
        })
      }
    }
  }
</script>