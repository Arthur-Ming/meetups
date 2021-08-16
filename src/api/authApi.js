import httpClient from "./httpClient";

export const authApi = {

  fetchUser() {
    return httpClient.get({
      url: '/auth/user'
    });
  },

  login(email, password) {
    return httpClient.post({
      url: `/auth/login`,
      payload: {
        email,
        password,
      }
    });
  },

  register(fullname, email, password) {
    return httpClient.post({
      url: '/auth/register',
      payload: {
        fullname,
        email,
        password,
      }
    });
  },

  logout() {
    return httpClient.post({
      url: '/auth/logout',
      toJson: false
    });
  },
};
