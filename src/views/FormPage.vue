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
    handleSubmit(meetup) {
      console.log("handleSubmit");
      this.meetup = meetup;
      meetupsApi.createMeetup(meetup);
    },

    handleCancel() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style scoped></style>
