/* eslint-disable no-useless-escape */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import useComponents from './components'
import usePlugins from './plugins'
import './assets/style/index.less'

useComponents(Vue)
usePlugins(Vue)
Vue.config.productionTip = false
// console.log(Vue, new Vue())
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
