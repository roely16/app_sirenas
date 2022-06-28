import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faPlay, faStop, faMapPin, faMapMarked, faSearch, faExclamationTriangle, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCircle, faPlay, faStop, faMapPin, faMapMarked, faSearch, faExclamationTriangle, faPlus, faTimes, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// import VueLayers from 'vuelayers'
// import 'vuelayers/lib/style.css' // needs css-loader
// Vue.use(VueLayers)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
