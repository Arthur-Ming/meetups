<template>
  <meetup-description :description="meetup.description"></meetup-description>
</template>

<script>
import MeetupDescription from "../components/layouts/MeetupDescription";
export default {
  name: "MeetupDescriptionPage",

  components: {
    MeetupDescription,
  },
  props: {
    meetup: Object,
  },
};
</script>

<style scoped></style>
