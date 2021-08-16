import fetchJson from "@/utils/fetch-json";

export const BASE_URL = process.env.VUE_APP_API_URL;

export default {

  get({
    url = '',
    payload = {},
    toJson = true
  }) {
    return fetchJson(`${BASE_URL}${url}`, payload, toJson);
  },

  post({
    url = '',
    payload = {},
    toJson = true
  }) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(payload),
      /*   credentials: 'include' */
    }, toJson);
  },

  put({
    url = '',
    payload = {},
    toJson = true
  }) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(payload)
    }, toJson);
  },

  delete({
    url = '',
    toJson = true }) {
    return fetchJson(`${BASE_URL}${url}`, {
      method: "DELETE",
    }, toJson);
  },

  imagePost({
    url = '',
    payload = {},
    toJson = true,
  }) {

    return fetchJson(`${BASE_URL}${url}`, {
      method: "POST",
      body: payload
    }, toJson);
  }
}