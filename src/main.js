import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/app.css';
import "@/assets/styles/index.css";
import { router } from './router';
import { ToasterPlugin } from '@/plugins/ToasterPlugin.js'

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(ToasterPlugin, { container: '#toast' })