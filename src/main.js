import Vue from 'vue'
import router from './router'
import App from './App'
// import vConsole from 'vconsole'
//plugins
// import FastClick from'fastclick'
// FastClick.attach(document.body)
//vux plugins
import Toast from './plugins/toast'
import Dialog from './plugins/dialog'
import ActionSheet from './plugins/actionsheet'
import Infinite from './plugins/infinite'
import Lazyload from './plugins/lazyload'
import TopFix from './plugins/topfix'

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(Infinite);
Vue.use(Lazyload,{
    defaultPic: 'http://img.zcool.cn/community/0161f656b0663e6ac7256cb052d31a.gif',
    errorPic: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
    threshold: 0,
    effectFadeIn: true
});
Vue.use(TopFix);



/* eslint-disable no-new */
//实例 Vue
var app = new Vue({
    el: '#app',
    router,
    ...App
})