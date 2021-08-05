<template>
  <form-layout title="Создание митапа">
    <meetup-form
      v-if="meetup"
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
    <!--  <portal selector="#app" prepend="true">
      <the-toaster ref="toaster" />
    </portal> -->
  </form-layout>
</template>

<script>
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
//import TheToaster from "../components/TheToaster.vue";

import { meetupsApi } from "@/api/meetupsApi";

export default {
  name: "FormEditPage",
  components: { FormLayout, MeetupForm /* TheToaster */ },

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
    async handleSubmit(meetup) {
      //  this.$refs.toaster.success("Portal");

      try {
        await meetupsApi.updateMeetup(meetup);
        this.$toaster.success("!!!!");
        this.meetup = meetup;
      } catch (err) {
        console.log(err);
        this.$toaster.error("Ошибка");
      }
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
