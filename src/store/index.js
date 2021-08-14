import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',

   modules: {
      auth
   }
})



















/* import Vue from 'vue';
import { authApi } from "@/api/authApi";
export default {
   auth: {
      state: Vue.observable({
         user: null,
      }),

      isAuthenticated() {
         return Boolean(this.state.user);
      },
      setUser(user) {
         this.state.user = user;
      },
      logoutUser() {
         this.state.user = null;
      },
      login(email, password) {
         return authApi.login(email, password).then((user) => {
            this.setUser(user);
         })
      },

   }
} */