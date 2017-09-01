import vue from 'vue'
import Toast from '@/plugins/toast'
import axios from 'axios'
import $ from '@/libs/utils'
import env from '@/config/env'
import * as APIS from './http-apis'
//设置默认主机地址
axios.defaults.baseURL = env.SERVER_ROOT;
const HTTP = axios.create({
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
});
// HTTP request 拦截器
HTTP.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// HTTP response 拦截器
HTTP.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)
// HTTP 验证token POST

HTTP.apiPost = function(type, param){
  let accessToken = $.local.get('wxToken').access_token;
  return HTTP.post(`${env.API_PATH}${APIS[type]}?access_token=${accessToken}`, param)
};
HTTP.apiGet = function(type, param){
  let accessToken = $.local.get('wxToken').access_token;
  return HTTP.get(`${env.API_PATH}${APIS[type]}?access_token=${accessToken}`, param)
};
export default HTTP;