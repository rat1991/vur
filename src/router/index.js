import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);

// router实例
const router = new VueRouter({
    //base: '/src',
    mode: 'history', //hash
    routes: routes
});
// router 全局钩子
router.beforeEach((to, from, next) => {
    //设置路由页面 标题
    document.title = to.name
    next()
});

export default router