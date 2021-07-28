<template>
  <form-layout title="Создать митап">
    <meetup-form
      :meetup="meetup"
      submit-text="Сабмит"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "../components/FormLayout";
import MeetupForm from "../components/MeetupForm";
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
        date: "2021-02-03",
        place: "",
        agenda: [],
      },
    };
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      alert("Cancel");
    },
  },
};
</script>

<style scoped></style>
