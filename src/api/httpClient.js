import fetchJson from "@/utils/fetch-json";

export const BASE_URL = process.env.VUE_APP_API_URL;

export default {

  get(url) {

    return fetchJson(`${BASE_URL}${url}`);
  },

  post(url, meetup = {}) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(meetup)
    });
  },
  pos(url) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "POST",

    });
  },

  put(url, meetup = {}) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(meetup)
    });
  },

  delete(url) {
    return fetchJson(`${BASE_URL}${url}`, {
      method: "DELETE",
    });
  },

  imagePost(url, file) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },

      body: file
    });
  }
}