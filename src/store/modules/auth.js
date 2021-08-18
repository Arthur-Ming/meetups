import { authApi } from "@/api/authApi";

const state = {
  user: null,
};

const getters = {
  IS_AUTHENTICATED(state) {
    return Boolean(state.user);
  },
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  LOGIN({ commit }, { email, password }) {
    return authApi
      .login(email, password)
      .then((user) => {
        commit("SET_USER", user);
      })
      .catch((error) => {
        throw error;
      });
  },

  LOGOUT({ commit }) {
    return authApi
      .logout()
      .then(() => {
        commit("SET_USER", null);
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
