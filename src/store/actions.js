import * as types from './mutation-types'
import http from '@/config/http'
// ============================================>
export default {
  updateUserinfo({commit, state}){
    return new Promise((resolve, reject) => {
      http.apiGet('USER_INFO').then(res =>{
        if (res.data.errcode === 0) {
          commit('UPDATE_USERINFO', res.data.user)
          resolve()
        }else{
          console.warn(res)
          reject()
        }
      })
    })
  },
  getEmployee({commit, state}){
    return new Promise((resolve, reject) => {
      http.apiGet('EMPLOYEE_INFO').then(res =>{
        if (res.data.errcode === 0) {
          commit('GET_EMPLOYEE', res.data.employee)
          console.log('获取职员信息')
          resolve()
        }else{
          console.warn(res + '获取职员信息')
          reject()
        }
      })
    })
  },
  getFieldType({commit, state}){
    return new Promise((resolve, reject) => {
      http.get('/api/open/v1.0/resource/get/dictionary').then(res =>{
        if (res.data.errcode === 0) {
          commit('GET_FIELDTYPE', res.data.list)
          console.log('获取字典信息')
          resolve()
        }else{
          console.warn(res + '获取字典信息')
          reject()
        }
      })
    })
  }
};
