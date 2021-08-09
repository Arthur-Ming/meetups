<template>
  <div class="meetup-agenda" v-if="!meetup.agenda.length">
    <p class="meetup-agenda__empty">
      Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь
      появится!
    </p>
  </div>
  <meetup-agenda :agenda="meetup.agenda" v-else />
</template>

<script>
import MeetupAgenda from "../components/layouts/MeetupAgenda";
export default {
  name: "MeetupAgendaPage",

  components: {
    MeetupAgenda,
  },
  props: {
    meetup: Object,
  },
};
</script>

<style scoped></style>
