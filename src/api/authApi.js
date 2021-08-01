import fetchJson from "@/utils/fetch-json";

const BASE_URL = process.env.VUE_APP_API_URL;

export const authApi = {
  fetchUser() {
    return fetchJson('/auth/user');
  },

  login(email, password) {

    return fetchJson(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password,
      })
    })
  },

  register(email, fullname, password) {
    return fetchJson('/auth/register', {
      email,
      fullname,
      password,
    });
  },

  logout() {
    return fetchJson('/auth/login', {
      email: '',
      password: '',
    });
  },
};
