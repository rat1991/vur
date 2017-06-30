import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter);

// router构造配置
const routes = [{
    path: '/',
    name: '首页',
    component: App.components.Index
}, {
    path: '/cell',
    name: '列表',
    component: App.components.UiCell
}, {
    path: '/form',
    name: '表单控件',
    component: App.components.UiForm
}, {
    path: '/button',
    name: '按钮组件',
    component: App.components.UiButton
}, {
    path: '/search',
    name: '搜索框',
    component: App.components.SearchBar
}, {
    path: '/toast',
    name: 'toast提示',
    component: App.components.Toast
}, {
    path: '/dialog',
    name: '对话框',
    component: App.components.UiDialog
}, {
    path: '/actionsheet',
    name: '抽屉',
    component: App.components.ActionSheet
}, {
    path: '/picker',
    name: '选择器',
    component: App.components.Picker
}, {
    path: '/tab',
    name: 'tab切换',
    component: App.components.Tab
}, {
    path: '/swiper',
    name: '滑动轮播',
    component: App.components.Swiper
}, {
    path: '/infinite',
    name: '滚轮加载',
    component: App.components.Infinite
}, {
    path: '/calendar',
    name: '日历',
    component: App.components.Calendar
}, {
    path: '/lazyload',
    name: '图片懒加载',
    component: App.components.Lazyload
}, {
    path: '/keypad',
    name: '数字键盘',
    component: App.components.Keypad
}]

// router实例
const router = new VueRouter({
    mode: 'history',
    routes: routes
});
router.afterEach((to, from, next) => {
    document.title = to.name
})
export default router