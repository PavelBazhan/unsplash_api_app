import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store'



Vue.config.productionTip = false
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000/'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
