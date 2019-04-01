import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import empty from './empty'

export const routes = [{
    path: '/',
    component: () => import('@/views/index/index'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/home.vue'),
      },
      {
        path: '/deal',
        component: () => import('@/views/deal/deal.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/my',
        component: () => import('@/views/my/my.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/team',
        component: () => import('@/views/team/team.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/mycode',
        component: () => import('@/views/mycode/mycode.vue'),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/shop/:id',
    component: () => import('@/views/shop/detail.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/confirm_order/:id',
    component: () => import('@/views/shop/detail.vue'),
  },
  {
    path: '/order/:id',
    component: () => import('@/views/shop/order.vue'),
  },
  {
    path: '/message',
    component: () => import('@/views/message/list.vue'),
  },
  {
    path: '/message/:id',
    component: () => import('@/views/message/detail.vue'),
  },

  //团队 

  {
    path: '/team/invite',
    component: () => import('@/views/team/invite.vue'),
  },
  {
    path: '/team/myteam',
    component: () => import('@/views/team/myteam.vue'),
  },
  {
    path: '/team/childteam/:id',
    component: () => import('@/views/team/childteam.vue'),
  },
  {
    path: '/team/dc',
    component: () => import('@/views/team/dc.vue'),
  },
  {
    path: '/team/register',
    component: () => import('@/views/team/register.vue'),
  },
  {
    path: '/team/login',
    component: () => import('@/views/team/login.vue'),
  },
  //我的
  {
    path: '/my/info',
    component: () => import('@/views/my/info.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/update_phone',
    component: () => import('@/views/my/update_phone.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/recharge',
    component: () => import('@/views/my/recharge.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/transfer',
    component: () => import('@/views/my/transfer.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/withdraw',
    component: () => import('@/views/my/withdraw.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/yl_list',
    component: () => import('@/views/my/yl_list.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/yl_list2',
    component: () => import('@/views/my/yl_list2.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/yl_list3',
    component: () => import('@/views/my/yl_list3.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/order',
    component: () => import('@/views/my/order/list.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/order/:id',
    component: () => import('@/views/my/order/detail.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/address',
    component: () => import('@/views/my/address/list.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/address_add',
    component: () => import('@/views/my/address/edit.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/address/:id',
    component: () => import('@/views/my/address/edit.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/bank',
    component: () => import('@/views/my/bank/list.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/bank_add',
    component: () => import('@/views/my/bank/edit.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my/bank/:id',
    component: () => import('@/views/my/bank/edit.vue'),
    meta: {
      requireAuth: true
    }
  },
  //更多
  {
    path: '/more',
    component: () => import('@/views/more/more.vue'),
  },
   {
    path: '/more/protocol',
    component: () => import('@/views/more/protocol.vue'),
  },
   {
    path: '/more/update_pwd',
    component: () => import('@/views/more/update_pwd.vue'),
  },
   {
    path: '/more/about',
    component: () => import('@/views/more/about.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/common/404')
  },
  //交易
  {
    path: '/deal/delivery',
    component: () => import('@/views/deal/delivery.vue')
  },
  {
    path: '/deal/detail',
    component: () => import('@/views/deal/detail.vue')
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0,
    x: 0
  }),
  routes: routes
})
