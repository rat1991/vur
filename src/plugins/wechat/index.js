import wx from 'weixin-js-sdk'
import axios from '@/config/http'
// ============================================>
export default {
  install (vue, options = {}){
    function Wechat(){
      this.options = options
    };
    Wechat.prototype = {
      config(apiArr, opt){
        let jsSdkUrl = sessionStorage.jsSdkUrl;
        let paramUrl = window.location.href.split('#')[0];
        if(jsSdkUrl && jsSdkUrl.indexOf(paramUrl) >= 0) {
          return new Promise((resolve, reject)=>{
            console.warn('js-SDK地址已验证')
          })
        };
        
        opt = apiArr.constructor === Object ? apiArr : opt;
        let options  = Object.assign({}, this.options, opt),
            url      = '/weixin/jsapi',
            debug    = options.debug || false;
        let apiList  = apiArr.constructor === Array ? apiArr : options.apiList;
        
        return new Promise((resolve, reject)=>{
          axios.post(url,{
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            url: paramUrl
          }).then(res =>{
            if(res.data.errcode === 0){
              wx.config({
                debug: debug,
                appId: res.data.appid,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: apiList
              })
              wx.ready(()=>{
                if(jsSdkUrl){
                  let _arr = JSON.parse(jsSdkUrl);
                  _arr.push( paramUrl)
                  console.log(_arr)
                  sessionStorage.jsSdkUrl = JSON.stringify(_arr);
                }else{
                  let _arr = [paramUrl];
                  sessionStorage.jsSdkUrl = JSON.stringify(_arr);
                }
                resolve()
              })
              wx.error(err =>{
                // if(res.errMsg === 'config:invalid signature'){
                //   location.reload()
                // }
                reject(err)
              })
            }
          }).catch(err =>{
            console.error('jsSDK auth error:' + err)
          })
        })
      },
      on(jsApi, param){
        if(jsApi === 'config' || jsApi === 'ready' || jsApi === 'error'){
          console.warn('使用$wx.config执行，执行后会返回promise来执行wx.ready或wx.error')
          return
        }
        wx[jsApi](param)
      }
    }

    vue.prototype.$wx = new Wechat()
  }
}
