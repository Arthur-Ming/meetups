<template>
  <form-layout title="Создать митап">
    <meetup-form
      :meetup="meetup"
      submit-text="Создать"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
import { meetupsApi } from "@/api/meetupsApi";
import { withProgress } from "@/helpers/withProgress.js";
export default {
  name: "FormPage",
  components: { FormLayout, MeetupForm },

  data() {
    return {
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
