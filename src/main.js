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

Axios.defaults.baseURL = 'http://10.10.31.97:8081/server'
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
