<template>
  <div class="meetup-agenda">
    <meetup-agenda-item
      :agendaItem="item"
      v-for="item in agenda"
      :key="item.id"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from "./MeetupAgendaItem.vue";

export default {
  name: "MeetupAgenda",
  components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
</script>