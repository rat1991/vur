import * as types from './mutation-types'
import axios from '@/config/http'
// ============================================>
export default {
  updateUserinfo({commit, state}){
    if(state.userinfo.userId) return;
    return new Promise((resolve, reject) => {
      axios.get(`/api/client/v1.0/get/info?access_token=${state.wxauth.access_token}`).then(res =>{
        if (res.data.errcode === 0) {
          localStorage.userInfo = JSON.stringify(res.data.user)
          commit('UPDATE_USERINFO', res.data.user)
          resolve()
        }else{
          console.warn(res)
          reject()
        }
      })
    })
  }
};
