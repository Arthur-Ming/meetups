import { authApi } from "@/api/authApi";

const state = {
   user: null
}

const getters = {
   IS_AUTHENTICATED(state) {
      return Boolean(state.user);
   }
}

const mutations = {
   SET_USER(state, user) {
      state.user = user;
   },
}

const actions = {
   LOGIN({ commit }, { email, password }) {
      return authApi.login(email, password).then((user) => {
         commit('SET_USER', user);
      })
   },

   LOGOUT({ commit }) {
      return authApi.logout().then(() => {
         commit('SET_USER', null);
      }).catch((error) => {
         if (error.message !== "Unexpected end of JSON input") throw error;
         else {
            commit('SET_USER', null);
         }
      });
   },
}

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions,
};