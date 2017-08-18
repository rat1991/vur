import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import wxauth from './modules/wxauth'
Vue.use(Vuex);

const state = {
  //微信用户信息 通过wxauth token获取
  userinfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    wxauth
  },
})

