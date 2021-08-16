import httpClient from "./httpClient";

export const meetupsApi = {

  fetchMeetups() {
    return httpClient.get({
      url: "/meetups"
    })
  },

  fetchMeetup(meetupId) {
    return httpClient.get({
      url: `/meetups/${meetupId}`
    })
  },

  createMeetup(meetup) {
    return httpClient.post({
      url: '/meetups',
      payload: meetup
    })
  },

  updateMeetup(meetup) {

    return httpClient.put({
      url: `/meetups/${meetup.id}`,
      payload: meetup
    })
  },

  /*  updateMeetup(meetup) {
 
     return httpClient.put(`/meetups/${meetup.id}`, meetup)
   },
  */
  attend(meetupId, { toJson = false } = {}) {                                 // Добавление текущего пользователя в список участников митапа
    return httpClient.put({
      url: `/meetups/${meetupId}/participation`,
      toJson: toJson
    })
  },

  deleteMeetup(meetupId, { toJson = false } = {}) {                           //Удаление митапа
    return httpClient.delete({ url: `/meetups/${meetupId}`, toJson: toJson })

  },

  leave(meetupId, { toJson = false } = {}) {   // Удаление текущего пользователя в список участников митапа

    return httpClient.delete({ url: `/meetups/${meetupId}/participation`, toJson: toJson })

  }
};
