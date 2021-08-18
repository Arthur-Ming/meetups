<template>
  <p class="meetup-description">{{ description }}</p>
</template>

<script>
export default {
  name: "MeetupDescription",

  props: {
    description: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
