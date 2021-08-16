// same as fetch, but throws FetchError in case of errors
// status >= 400 is an error
// network error / json error are errors
import Toaster from "@/plugins/ToasterPlugin/index.js";
import store from "@/store/index.js";


export default async function (url, params, toJson = true) {
  let response;

  try {
    response = await fetch(url, { ...params, credentials: 'include' });
  } catch (err) {
    throw new FetchError(response, "Network error has occurred.");
  }

  let body;

  if (!response.ok) {

    if (response.status === 401 && store.getters['auth/IS_AUTHENTICATED']) {      //Session invalidation

      store.dispatch("auth/LOGOUT");
    }

    let errorText = response.statusText;

    try {

      body = await response.json();

      errorText = (body.error && body.error.message) || (body.data && body.data.error && body.data.error.message) || errorText;

    } catch (error) { /* ignore failed body */ }

    let message = `Error ${response.status}: ${errorText}`;

    throw new FetchError(response, body, message);

  }

  if (toJson) {
    try {
      return await response.json();
    } catch (err) {
      throw new FetchError(response, null, err.message);
    }
  }

  return response;

}

export class FetchError extends Error {
  name = "FetchError";

  constructor(response, body, message) {
    super(message);
    this.response = response;
    this.body = body;
  }
}

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', event => {
  if (event.reason instanceof FetchError) {
    Toaster.error(event.reason.message)
  }
});

