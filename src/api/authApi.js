import httpClient from "./httpClient";

export const authApi = {

  fetchUser() {
    return httpClient.get('/auth/user');
  },

  login(email, password) {
    return httpClient.post(`/auth/login`, {
      email,
      password,
    });
  },

  register(fullname, email, password) {
    return httpClient.post('/auth/register', {
      fullname,
      email,
      password,
    });
  },

  logout() {
    return httpClient.post('/auth/login');
  },
};
