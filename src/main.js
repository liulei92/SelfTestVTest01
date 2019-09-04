import '@babel/polyfill'

import Vue from 'vue'
import './plugins/element'
import './plugins/custom'
// import Lodash from 'lodash'
// import Dayjs from 'dayjs'
import App from './App.vue'
import router from './router'
// import store from './store'

// import Utils from './utils/utils'
import Toast from './utils/toast'
import Ajax from './utils/ajax'
// import Cache from './utils/cache'
// import ApiList from './utils/api'
// import * as filters from './utils/filter'

// import './styles/public.scss'
// import './styles/styles.scss'
// import './styles/element-ui.scss'

// 全局注册自定义组件
// import CInput from './components/C-Form/CInput'
// Vue.component(CInput.name, CInput)

Vue.config.productionTip = false

Vue.prototype.ajax = Ajax // 网络请求封装类
Vue.prototype.toast = Toast // 提示
// Vue.prototype.utils = Utils // 工具类
// Vue.prototype.apis = ApiList // api
// Vue.prototype.dayjs = Dayjs // dayjs
// Vue.prototype.cache = Cache // 缓存
// Vue.prototype._ = Lodash // Lodash 全局

// 挂载 filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')

// 不重定向白名单
// const whiteList = ['/login']

// permission control
router.beforeEach((to, from, next) => {
  next()
})

// router.afterEach((to, from) => {
//   document.title = (to.meta.title ? `${to.meta.title}-` : '') + 'pingm-vuecli3-test'
// })
