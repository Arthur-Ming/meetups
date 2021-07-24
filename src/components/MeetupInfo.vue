<template>
  <ul class="info-list">
    <li>
      <app-icon class="info-list__icon" icon="user" />
      {{ organizer }}
    </li>
    <li>
      <app-icon class="info-list__icon" icon="map" />
      {{ place }}
    </li>
    <li>
      <app-icon class="info-list__icon" icon="cal-lg" />
      <time :datetime="dateOnlyString">{{ localDate }}</time>
    </li>
  </ul>
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
export default {
  name: "MeetupInfo",
  components: {
    AppIcon,
  },
  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    localDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    dateOnlyString() {
      return new Date(this.date).toISOString().split("T")[0];
    },
  },
};
</script>
