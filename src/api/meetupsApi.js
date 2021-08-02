import httpClient from "./httpClient";

export const meetupsApi = {

  fetchMeetups() {
    return httpClient.get("/meetups")
  },

  fetchMeetup(meetupId) {
    return httpClient.get(`/meetups/${meetupId}`)

  },

  createMeetup(meetup) {

    return httpClient.post('/meetups', meetup)
  },

  updateMeetup(meetup) {

    return httpClient.put(`/meetups/${meetup.id}`, meetup)
  },

  attend(meetupId) {                                 // Добавление текущего пользователя в список участников митапа

    return httpClient.put(`/meetups/${meetupId}/participation`)
  },

  deleteMeetup(meetupId) {                           //Удаление митапа
    return httpClient.delete(`/meetups/${meetupId}`)
  },

  leave(meetupId) {                               // Удаление текущего пользователя в список участников митапа
    return httpClient.delete(`/meetups/${meetupId}/participation`)
  }
};
