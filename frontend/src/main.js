import Vue from 'vue'
import App from './App.vue'


import axios from 'axios'
import VueAxios from 'vue-axios'


import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';


Vue.component('v-select', vSelect);

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
