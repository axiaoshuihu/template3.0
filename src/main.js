import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss'; // global css
import style from './utils/style'; // style for elementTable
import 'element-ui/lib/theme-chalk/display.css';
import App from './App';
import store from './store';
import router from './router';
// 获取filters
import * as filters from './filters/index';
import '@/icons'; // icon
import '@/permission'; // permission control
Vue.use(ElementUI);
// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
Vue.prototype.$style = style;
console.log(process.env.VUE_APP_BASE_API);
const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
export default vm;
