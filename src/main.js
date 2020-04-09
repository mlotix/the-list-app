import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faCheck, faChevronUp, faTimes, faArrowRight, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faEdit)
library.add(faCheck)
library.add(faChevronUp)
library.add(faTimes)
library.add(faArrowRight)
library.add(faEllipsisV)


Vue.component('fa-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('IMPORT_STATE_FROM_STORAGE')
  },
  render: h => h(App)
}).$mount("#app");
