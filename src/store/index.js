import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/libs/utils'
import mutations from './mutations'
import actions from './actions'
import wxauth from './modules/wxauth'
Vue.use(Vuex);

const state = {
  // 微信用户信息 通过wxauth token获取
  userinfo: localStorage.userInfo ? utils.local.get('userinfo') : {},
  // 职员信息
  employee: localStorage.employee ? utils.local.get('employee') : {},
  // 字段类型
  fieldType: {
    // 客户类型
    CUSTOMER_TYPE: localStorage.fieldType ? utils.local.get('fieldType').CUSTOMER_TYPE : [],
    // 账单状态
    BILL_STATUS: localStorage.fieldType ? utils.local.get('fieldType').BILL_STATUS : [],
    // 工单状态
    ORDER_STATUS: localStorage.fieldType ? utils.local.get('fieldType').ORDER_STATUS : [],
    // 支付方式
    PAYMENT_TYPE: localStorage.fieldType ? utils.local.get('fieldType').PAYMENT_TYPE : [],
    // 职位
    POSITION: localStorage.fieldType ? utils.local.get('fieldType').POSITION : [],
    // 服务类型
    SERVICE_TYPE: localStorage.fieldType ? utils.local.get('fieldType').SERVICE_TYPE : [],
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    wxauth
  },
})

