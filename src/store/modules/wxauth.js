// 微信授权验证
import * as types from '../mutation-types'
import $ from '@/libs/utils'
import axios from '@/config/http'
let $http = axios.create();

// ============================================>
const state= {
  //微信授权accessToken
  access_token: localStorage.wxToken ? $.local.get('wxToken').access_token : '',
  //当accessToken过期时用于换取新到accessToken
  refresh_token: localStorage.wxToken ? $.local.get('wxToken').refresh_token : '',
  //微信token超时时间
  token_timeout: localStorage.wxToken ? $.local.get('wxToken').token_timeout : 0,
  //containRoles 系统角色
  system_roles: localStorage.wxToken ? $.local.get('wxToken').system_roles : [],
}

const actions = {
  getAccessToken({commit, state, dispatch}, payload){
    let url;
    if(payload.state === 'base') url = '/weixin/accessToken/base';
    if(payload.state === 'userinfo') url = '/weixin/accessToken/userinfo';
    return new Promise((resolve, reject) => {
      $http.post(url, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: payload.code,
        url: `http://${location.host}${process.env.LOCAL_ROOT}authorizeBack`
      }).then(res =>{
        if(res.data.errcode === 0){
          commit('UPDATE_ONLINE_TOKEN', res.data)
          resolve(res.data)
          dispatch('updateUserinfo')
        }
        reject(res.data)
      })
    })
  },
  updateAccessToken({commit, state, dispatch}, payload){
    payload = payload || {grant_type: 'refresh_token', refresh_token: state.refresh_token}
    let rawObj = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };
    Object.assign(rawObj, payload);
    return new Promise((resolve, reject) => {
      $http.post('/oauth/client/accessToken', rawObj).then(res =>{
        if(res.data.errcode === 0){
          commit('UPDATE_ONLINE_TOKEN', res.data)
          resolve(res.data)
          dispatch('updateUserinfo')
        }
        reject(res.data)
      }).catch(error =>{
        console.error(error)
      })
    })
  }
}

const mutations = {
  [types.SYNC_LOCAL_TOKEN] (state){
    let localData = $.local.get('wxToken');
    state.access_token = localData ? localData.access_token : ''
    state.refresh_token = localData ? localData.refresh_token : ''
    state.token_timeout = localData ? localData.token_timeout : 0
    state.system_roles = localData ? localData.system_roles : []
  },
  [types.UPDATE_ONLINE_TOKEN] (state, data){
    let localData = {};
    let timeout = new Date().getTime() + (data.expiresIn - 60) * 1000;
    //更新state
    state.access_token = data.token
    state.refresh_token = data.refreshToken
    state.token_timeout = timeout
    state.system_roles = data.roleCodes
    //更新本地缓存
    localData.access_token = data.token
    localData.refresh_token = data.refreshToken
    localData.token_timeout = timeout
    localData.system_roles = data.roleCodes
    $.local.set('wxToken', localData);
  },
  [types.DESTROY_ACCESS_TOKEN] (state, data){
    state.access_token = ''
    state.refresh_token = ''
    state.token_timeout = 0
    state.system_roles = []
    //清除本地缓存
    localStorage.removeItem('wxToken')
  }
}

export default {
    state,
    actions,
    mutations
}