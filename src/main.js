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

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(Infinite);



/* eslint-disable no-new */
//实例 Vue
var app = new Vue({
    el: '#app',
    router,
    ...App
})