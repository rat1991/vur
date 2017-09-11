import * as types from './mutation-types'
import utils from '@/libs/utils'

export default {
  [types.UPDATE_USERINFO] (state, data){
    localStorage.userInfo = JSON.stringify(data)
    state.userinfo = data
  },
  [types.GET_EMPLOYEE] (state, data){
    //本地缓存
    utils.local.set('employee', data)
    state.employee = data
  },
  [types.GET_FIELDTYPE] (state, data) {
    data.forEach(curData=>{
      let label = curData.value;
      Object.keys(state.fieldType).forEach(cur=>{
        if(cur === label){
          state.fieldType[cur] = curData.data
        }
      })
    })
    //本地缓存
    utils.local.set('fieldType', state.fieldType)
  }
};
