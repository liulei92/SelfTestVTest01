import Vue from 'vue'
import Router from 'vue-router'
import Hub from '@/components/hub.vue' // 过渡层 hub

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'subscribe'
      }
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: () => import(/* webpackChunkName: "subscribe" */ './views/Subscribe.vue'),
      meta: { title: '订阅' }
    },
    {
      path: '/pages',
      component: Hub,
      children: [
        {
          path: '',
          redirect: {
            name: 'login'
          }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/login/login.vue'),
          meta: { title: '登录' }
        }
      ]
    },
    {
      path: '/test',
      component: Hub,
      children: [
        {
          path: '',
          redirect: {
            name: 'test-index'
          }
        },
        {
          path: 'index',
          name: 'test-index',
          component: () => import(/* webpackChunkName: "test-index" */ './views/test/test-index.vue'),
          meta: { title: 'test-index' }
        },
        {
          path: 'form-test',
          name: 'test-form-test',
          component: () => import(/* webpackChunkName: "test-form-test" */ './views/test/test-form-test.vue'),
          meta: { title: 'test-form-test' }
        },
        {
          path: 'custom-test',
          name: 'test-custom-test',
          component: () => import(/* webpackChunkName: "test-custom-test" */ './views/test/test-custom-test.vue'),
          meta: { title: 'test-custom-test', keepAlive: true }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
