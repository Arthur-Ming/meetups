import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/app.css';
import "@/assets/styles/index.css";
import { router } from './router';
import VueMeta from 'vue-meta';
import ToasterPlugin from '@/plugins/ToasterPlugin/plugin.js';
import TheTopProgressBarPlugin from '@/plugins/TopProgressBar/plugin.js';
import { authApi } from "@/api/authApi";
import store from "@/store/index.js";

Vue.config.productionTip = false;
Vue.use(VueMeta)
Vue.use(ToasterPlugin)
Vue.use(TheTopProgressBarPlugin, { router })

authApi.fetchUser().then((user) => {

  store.auth.setUser(user)
}).catch(() => {



}).finally(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app');
})



