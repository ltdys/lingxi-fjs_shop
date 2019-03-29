import router from './router'
import store from './store'

// router.beforeEach((to, from, next) => {
//   //判断登录权限
//   if (to.matched.some(record => record.meta.requireAuth)){
//     if(store.getters.isLogin){
//         next()
//     }else{
//       console.warn('需要登录访问')
//       next({ path: '/team/login',replace: true})
//     }
//   }else{
//     next()
//   }
// })

var localStorage = window.localStorage

router.beforeEach((to, from, next) => {
  var storage = JSON.parse(localStorage.getItem('USER_ID'))
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (storage) {  // 通过storage判断是否登录
      next()
    } else {
      // next({ path: '/team/login',replace: true})
      next({
        path: '/team/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})
