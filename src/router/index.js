import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import routesAuth from './routes-auth'

Vue.use(VueRouter);

// router实例
const router = new VueRouter({
    //base: '/src',
    mode: 'history', //hash
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});
// router 全局钩子
router.beforeEach((to, from, next) => {
    //设置路由页面 标题
    document.title = to.name
    //设置页面权限验证
    routesAuth(to, from, next)
});
export default router