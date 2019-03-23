import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  //判断登录权限
  if (to.matched.some(record => record.meta.requireAuth)){
    if(store.getters.isLogin){
        next()
    }else{
      console.warn('需要登录访问')
      next({ path: '/login',replace: true})
    }
  }else{
    next()
  }
})
