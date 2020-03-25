// dependencies
import jQuery from 'jquery'
window.jQuery = jQuery;
window.$ = jQuery;

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import VueClipboard from 'vue-clipboard2'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueClipboard);

Vue.prototype.http = axios;
Vue.prototype.server = 'http://192.168.1.101:7125';//服务器处理地址
Vue.prototype.domain = 'https://images.xuthus.cc';//又拍云加速域名
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
