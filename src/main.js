import Vue from 'vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.vue'

// Vue 2.7 with Composition API support
new Vue({
  render: h => h(App),
}).$mount('#app')
