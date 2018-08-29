import Vue from 'vue'
import store from '../store'
import VueResource from 'vue-resource'
// import { Message } from 'element-ui'
Vue.use(VueResource)
// Vue.http.options.emulateJSON = true
Vue.http.options.root = '/tr02c'

// response interceptor
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    // don't handle for login page
    if (store.state.route.path === '/login') {
      return
    }
    if (response.status === 401) {
      // Vue.prototype.$eventBus.$emit('quit')
      console.log(Vue.t('http.error.E401'))
      return
    }
    if (response.status === 403) {
      // Message.error(Vue.t('http.error.E404'))
      console.log(Vue.t('http.error.E403'))
      return
    }
    if (response.status === 404) {
      // Message.error(Vue.t('http.error.E404'))
      console.log(Vue.t('http.error.E404'))
      return
    }
    if (response.status === 500) {
      // Message.error(Vue.t('http.error.E500'))
      console.log(Vue.t('http.error.E500'))
      return
    }
    // other errors
    if (!response.ok) {
      console.log(response)
      return
    }
  })
})

