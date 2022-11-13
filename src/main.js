import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading } from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.filter('dateFormat', (str) => {
  const dt = new Date(str);
  function addZero(n) {
    return n > 9 ? n : '0' + n
  }
  const y = addZero(dt.getFullYear());
  const m = addZero(dt.getMonth() + 1);
  const d = addZero(dt.getDate());
  const hh = addZero(dt.getHours());
  const mm = addZero(dt.getMinutes());
  const ss = addZero(dt.getSeconds());

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})



axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

// 声明请求拦截器
let loadingInstance = null
axios.interceptors.request.use((config)=>{
  loadingInstance = Loading.service(config);
  return config
})
// 声明相应拦截器
axios.interceptors.response.use((response)=>{
  loadingInstance.close();
  return response
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
