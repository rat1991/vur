import store from '../store'
import $ from '../libs/utils'

export default function routesAuth(to, from, next) {
  //设置页面权限验证
    let isAuth = to.meta.requiresAuth;
    let isRole = to.meta.requireRole;
    if(isAuth){
        let authStore = store.state.wxauth;
        let toTime = new Date().getTime();
        //判断是否执行角色验证
        function authRole(){
            if(isRole && isRole.length > 0){
                let systemRoles = authStore.system_roles;
                let isTrue = systemRoles.find((role, index)=>{
                    return isRole.indexOf(role) !== -1
                });
                isTrue ? next() : next('/authmsg/warn');
            }else{
                next()
            }
        }
        if(authStore.access_token && authStore.token_timeout > toTime){
            //已获取token，且token有效
            authRole()
        }else if(authStore.access_token && authStore.token_timeout < toTime){
            //已获取token，但token超时
            store.dispatch('updateAccessToken').then(res =>{
                authRole()
            }).catch(res =>{
                if(res.errcode === 401){
                    store.commit('DESTROY_ACCESS_TOKEN')
                     next({
                        path: '/authorize',
                        query: {
                            authBackUrl: to.fullPath //传送导航页面并在验证是缓存
                        }
                    })
                }
            })
        }else{
            //没获取token时，验证浏览器是否为微信 true执行验证 false跳转到登陆
            if($.device.wechat){
                next({
                    path: '/authorize',
                    query: {
                        authBackUrl: to.fullPath //传送导航页面并在验证是缓存
                    }
                })
            }else{
                next({
                    path: '/login',
                    query: {
                        authBackUrl: to.fullPath //传送导航页面并在验证是缓存
                    }
                })
            }
        }
    }else{
        next()
    }
}