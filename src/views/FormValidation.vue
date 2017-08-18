<template>
  <page current>
    <ui-cells title="注册">
        <ui-input label="用户名" v-model="form.name" clear required v-validator.chineseName></ui-input>
        <ui-input type="password" label="密码" v-model="form.password" clear v-validator></ui-input>
        <ui-input type="phone" label="手机类型" v-model="form.phone" clear required v-validator.phone></ui-input>
        <ui-input type="email" label="邮箱" v-model="form.email" v-validator="validator"></ui-input>
    </ui-cells>    
    <p>{{form.password}}</p>
    <div class="ui-btn-area">
      <ui-button type="success" @click="event">提交</ui-button>
    </div>
  </page>
</template>


<script>
  import Page from '../components/page'
  import {Toptips} from '../components/toptips'
  import {UiButton} from '../components/buttons'
  import {UiCells,UiCell} from '../components/cell'
  import {UiInput,UiCheckbox,UiRadio,UiTextarea,UiSwitch,UiSelect} from '../components/form'

  export default {
    components:{
      Page,
      Toptips,
      UiButton,
      UiInput,    
      UiCells,
      UiCell,
      UiCheckbox,
      UiRadio,
      UiSwitch,
      UiSelect,
      UiTextarea
    },
    data() {
      return {
        showTips: false,
        form: {
          name: '',
          password: '',
          phone: '',
          email: ''
        }
      }
    },
    methods: {
      validator(){
        return {
          rules: {
            max: 4,
            defind(val){
              return val === 'ok'
            }
          },
          errorMsg: {
            defind: '你输入的不是okokok'
          }
        }
      },
      event(){
        this.$validate().then(()=>{
          console.log('验证成功')
        }).catch((data)=>{
          console.log('验证失败',data)
        })
      }
    }
  };
</script>
