import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/app.css';
import "@/assets/styles/index.css";
import { router } from './router';
import ToasterPlugin from '@/plugins/ToasterPlugin.js'
import TheTopProgressBarPlugin from '@/plugins/TheTopProgressBarPlugin.js'

Vue.config.productionTip = false;

Vue.use(ToasterPlugin)
Vue.use(TheTopProgressBarPlugin, { router })

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

