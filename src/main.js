// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/http'
import store from './store'
import './assets/css/repeat.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import store from './store/index'

Vue.use(ElementUI)
Vue.config.productionTip = false

//axios全局配置

Vue.prototype.$axios = axios;

//全局守卫
router.beforeEach((to, from, next) => {
  //获取token
  const isLogin = localStorage.jwtToken ? true : false;

  if (to.path == "/login" || to.path == "/register" || to.path == "/" || to.path == "/agreement" || to.path == "/loginByEnt" || to.path == "/hrAgreement") {
    next()
  } else {
    isLogin ? next() : next('/login')
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
