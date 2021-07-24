<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <app-icon :icon="icon" />
    </div>
    <div class="meetup-agenda__item-col">
      {{ time }}
    </div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title">
        {{ title }}
      </h5>
      <template v-if="agendaItem.type === 'talk'">
        <p>
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
      </template>
      <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
    </div>
  </div>
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
import { getAgendaItemIcons, getAgendaItemDefaultTitles } from "../data.js";

export default {
  name: "MeetupAgendaItem",
  components: {
    AppIcon,
  },
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icon() {
      return getAgendaItemIcons()[this.agendaItem.type];
    },
    title() {
      return this.agendaItem.title
        ? this.agendaItem.title
        : getAgendaItemDefaultTitles()[this.agendaItem.type];
    },
    time() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
  },
};
</script>

