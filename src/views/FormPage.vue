<template>
  <form-layout :title="title">
    <meetup-form
      :meetup="meetup"
      submit-text="Создать"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/layouts/FormLayout";
import MeetupForm from "../components/layouts/MeetupForm";
import { meetupsApi } from "@/api/meetupsApi";
import { withProgress } from "@/helpers/withProgress.js";
export default {
  name: "FormPage",
  components: { FormLayout, MeetupForm },

  data() {
    return {
      title: "Создание митапа",
      meetup: {
        id: 0,
        title: "",
        description: "",
        imageId: null,
        date: new Date(),
        place: "",
        agenda: [],
      },
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
        await withProgress(meetupsApi.createMeetup(meetup));
        this.$toaster.success("!!!!");
        this.meetup = meetup;
      } catch (err) {
        this.$toaster.error("Ошибка");
        throw err;
      }
    },

    handleCancel() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style scoped></style>
