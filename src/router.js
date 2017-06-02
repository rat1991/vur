import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter);

// router构造配置
const routes = [{
    path: '/',
    component: App.components.UiCell
}, {
    path: '/form',
    component: App.components.UiForm
}, {
    path: '/button',
    component: App.components.UiButton
}, {
    path: '/search',
    component: App.components.SearchBar
}, {
    path: '/toast',
    component: App.components.Toast
}, {
    path: '/dialog',
    component: App.components.UiDialog
}, {
    path: '/actionsheet',
    component: App.components.ActionSheet
}, {
    path: '/picker',
    component: App.components.Picker
}, {
    path: '/tab',
    component: App.components.Tab
}, {
    path: '/swiper',
    component: App.components.Swiper
}, {
    path: '/infinite',
    component: App.components.Infinite
}, {
    path: '/calendar',
    component: App.components.Calendar
}]

// router实例
const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router