<template>
  <form-layout :title="title">
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
import FormLayout from "@/components/layouts/FormLayout";
import MeetupForm from "@/components/layouts/MeetupForm";
import { withProgress } from "@/helpers/withProgress.js";
import { meetupsApi } from "@/api/meetupsApi";

export default {
  name: "FormEditPage",
  components: { FormLayout, MeetupForm },

  props: {
    meetupId: {
      required: true,
    },
  },
  async beforeRouteEnter(to, from, next) {
    const meetup = await meetupsApi.fetchMeetup(to.params.meetupId);
    next((vm) => {
      vm.setMeetup(meetup);
    });
  },

  async beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      const meetup = await meetupsApi.fetchMeetup(to.params.meetupId);
      this.setMeetup(meetup);
      next();
    }
  },
  data() {
    return {
      title: "Редактирование митапа",
      meetup: null,
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  methods: {
    async handleSubmit(meetup) {
      try {
        await withProgress(meetupsApi.updateMeetup(meetup));
        this.$toaster.success("Митап изменён!");
        this.meetup = meetup;
      } catch (error) {
        this.$toaster.error(error.body.message);
        throw error;
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
