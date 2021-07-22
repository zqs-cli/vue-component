/* eslint-disable no-useless-escape */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import commonComponents from './components'
import './assets/style/index.less'
import './plugins'

Vue.use(commonComponents)

Vue.config.productionTip = false
// console.log(Vue, new Vue())
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
