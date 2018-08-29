import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: (resolve) => {
        require(['../components/common/Login.vue'], resolve)
      }
    },
    {
      path: '/register',
      component: (resolve) => {
        require(['../components/common/Register.vue'], resolve)
      }
    },
    {
      path: '/changePassword',
      component: (resolve) => {
        require(['../components/common/ChangePassword.vue'], resolve)
      }
    },
    {
      path: '/selectFrame',
      component: (resolve) => {
        require(['../components/src/SelectFrame.vue'], resolve)
      }
    }, {
      path: '/editFrame',
      component: (resolve) => {
        require(['../components/src/EditFrame.vue'], resolve)
      }
    }, {
      path: '/addFrame',
      component: (resolve) => {
        require(['../components/src/AddFrame.vue'], resolve)
      }
    }, {
      path: '/logout',
      component: (resolve) => {
        require(['../components/common/Login.vue'], resolve)
      }
    },  {
      path: '*',
      component: {
        render(h) {
          return h('div', { staticClass: 'flex flex-main-center', attrs: { style: 'width:100%;font-size:32px' } }, 'Page not found')
        }
      }
    }
  ]
})
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  var session = window.sessionStorage.getItem('test')
  console.log(session, 'session')
  console.log(to.path, 'to.path')
  if (session !== 'test' && to.path !== '/login') {
    if (to.path === '/register') {
      next()
    } else if (to.path === '/changePassword') {
      console.log('走这了1111111111111')
      next()
    } else {
      next('/login')
    }
  } {
    next()
  }
})
export default router

