/* device.js
 * By rat1991
 * 
 */

  export function Device(ua) {
    this.ua = ua || navigator.userAgent
    this.device = {}

    this.checkDevice()
  }
  Device.prototype = {
    checkDevice(){
      let ua = this.ua;
      let iphone  = ua.match(/(iPhone\sOS)\s([\d_]+)/),
          ipad    = !iphone && ua.match(/(iPad).*OS\s([\d_]+)/),
          android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
      // Android
      if(android) {
        this.device.os = 'android'
        this.device.osVersion = android[2]
        this.device.android = true
        this.device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
      }
      // iOS
      if(iphone || ipad){
        this.device.os = 'ios'
        this.device.ios = true
        if(iphone){
          this.device.osVersion = iphone[2].replace(/_/g, '.');
          this.device.iphone = true;
        }
        if(ipad){
          this.device.osVersion = ipad[2].replace(/_/g, '.');
          this.device.ipad = true;
        }
      }
    },
    checkWechat(){
      let wechat = this.ua.match(/(MicroMessenger);?[\s\/]+([\d.]+)?/);
      if(wechat){
        this.device.wechat = true
        this.device.wechatVersion = wechat[2]
      }
    }
  }
  export default new Device()