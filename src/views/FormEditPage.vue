<template>
  <form-layout title="Создание митапа">
    <meetup-form
      v-if="meetup"
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
import { meetupsApi } from "@/api/meetupsApi";
export default {
  name: "FormEditPage",
  components: { FormLayout, MeetupForm },

  props: {
    meetupId: {
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    meetupsApi.fetchMeetup(to.params.meetupId).then((meetup) => {
      next((vm) => {
        vm.setMeetup(meetup);
      });
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      meetupsApi.fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup);
        next();
      });
    }
  },
  data() {
    return {
      meetup: null,
    };
  },
  methods: {
    handleSubmit(meetup) {
      meetupsApi.updateMeetup(meetup);
      this.meetup = meetup;
    },

    handleCancel() {
      this.$router.push({
        name: "meetup",
        params: { meetupId: this.meetupId },
      });
    },
    setMeetup(meetup) {
      this.meetup = meetup;
    },
  },
};
</script>

<style scoped></style>
