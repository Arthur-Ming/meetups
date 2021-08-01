import fetchJson from "@/utils/fetch-json";

const BASE_URL = process.env.VUE_APP_API_URL;

export const meetupsApi = {

  fetchMeetups() {
    return fetchJson(`${BASE_URL}/meetups`);
  },

  fetchMeetup(meetupId) {
    return fetchJson(`${BASE_URL}/meetups/${meetupId}`);
  },

  createMeetup(meetup) {

    return fetchJson(`${BASE_URL}/meetups/${meetup.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(meetup)
    });
  },

  updateMeetup(meetup) {

    return fetchJson(`${BASE_URL}/meetups/${meetup.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(meetup)
    });
  },
  //attend(meetupId)// Добавление текущего пользователя в список участников митапа
  //deleteMeetup(meetupId) //Удаление митапа
  //leave(meetupId) // Удаление текущего пользователя в список участников митапа

};
