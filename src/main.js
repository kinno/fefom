import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import Axios from 'axios'
import VueCurrencyFilter  from 'vue-currency-filter'
import VueSimpleAlert from "vue-simple-alert";


Axios.defaults.baseURL = 'http://localhost:8081/server'
// Axios.defaults.baseURL = 'http://10.10.31.97:8081/server'
Axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('jwt');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  // this.$http.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('jwt')}`;
})

Axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if(error.response.status === 401){
    localStorage.clear();
    window.localStorage.clear();
   router.push({name: 'Login', params: { expired: true }}).catch(err => {})
    return Promise.reject(error);
  }else{
    return Promise.reject(error);
  }
  
});

Vue.prototype.$http = Axios;
Vue.use(VueCurrencyFilter,{
  symbol : '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
});
Vue.use(VueSimpleAlert);



sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
Vue.config.devtools = true;
