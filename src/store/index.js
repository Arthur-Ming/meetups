import Vue from 'vue';
//import { authApi } from "@/api/authApi";
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

   }
}