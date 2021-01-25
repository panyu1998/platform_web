// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import App from './App'
import router from './router'
import BScroll from 'better-scroll'
import ElementUI from 'element-ui'
import formCreate from "@form-create/element-ui"
Vue.use(formCreate)
import 'element-ui/lib/theme-chalk/index.css'
import global_ from './Global'
import 'font-awesome/css/font-awesome.min.css'
import {setCookie,getCookie,delCookie} from './components/cookies.js'
import md5 from 'js-md5'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.GLOBAL = global_;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;
// Vue.use(VueCookies);
Vue.prototype.$md5 = md5;
import $ from 'jquery';
// import axios from 'axios'
// Vue.prototype.$axios = axios
//路由守卫机制
//路由守卫机制
router.beforeEach((to, from, next) => {
    //只有有一项为true则为true  some
    localStorage.setItem('routerName', to.name)
    if (to.path === '/' && localStorage.getItem('login') === '1') {
      if (true) { //true需要判定一下不然会死循环
        next({
          name: 'EIndex'
        });
      }
    } else {
      console.log('验证是否登录');
      //先看router.js的requireAuth为true则为需要登录后才显示的页面
      if (to.matched.some(m => m.meta.requireAuth)) {
        if (localStorage.getItem('login') === '1') { //已登录的
          next();
        } else {
          next('/');
          // Vue.prototype.$message.warning('检测到您还未登录,请登录后操作！')
        }
      } else { //requireAuth为false的
        next(); //一定要记得写
      }
    }
  }),

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
