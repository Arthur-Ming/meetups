<template>
  <div class="bg-white">
    <template v-if="meetup">
      <meetup-cover :title="meetup.title" :link="meetupImagelink" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <content-tabs :tabs="tabs">
              <router-view :meetup="meetup" />
            </content-tabs>
          </div>
          <div class="meetup__aside">
            <meetup-info
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="meetupDate"
            />
            <div class="meetup__aside-buttons">
              <primary-button block>Участвовать</primary-button>
              <primary-button
                tag="router-link"
                :to="{ name: 'meetup-edit', params: { meetup } }"
                block
              >
                Редактировать
              </primary-button>
              <danger-button block>Удалить</danger-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h3>Loading...</h3>
    </template>
  </div>
</template>

<script>
import ContentTabs from "../components/ContentTabs";
import DangerButton from "../components/DangerButton.vue";
import MeetupCover from "../components/MeetupCover";
import MeetupInfo from "../components/MeetupInfo";
import PrimaryButton from "../components/PrimaryButton";

import { fetchMeetup, getMeetupCoverLink } from "../data";

export default {
  name: "MeetupPage",

  components: {
    ContentTabs,
    MeetupCover,
    MeetupInfo,
    PrimaryButton,

    DangerButton,
  },

  beforeRouteEnter(to, from, next) {
    fetchMeetup(to.params.meetupId)
      .then((meetup) => {
        next((vm) => {
          vm.setMeetup(meetup);
        });
      })
      .catch(() => {
        next("/meetups");
      });
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup);
        next();
      });
    }
  },

  props: {
    meetupId: {
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      tabs: [
        { to: { name: "meetup.description" }, text: "Описание" },
        { to: { name: "meetup.agenda" }, text: "Программа" },
      ],
    };
  },
  computed: {
    meetupImagelink() {
      return this.meetup.imageId ? getMeetupCoverLink(this.meetup) : null;
    },
    meetupDate() {
      return new Date(this.meetup.date);
    },
  },
  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    },
  },
};
</script>

<style scoped></style>
