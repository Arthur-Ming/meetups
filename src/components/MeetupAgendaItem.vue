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
<style scoped>
.meetup-agenda__item {
  padding: 24px 0;
  border-top: 1px solid var(--grey-3);
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__item:first-child {
  border-top: none;
}

.meetup-agenda__item-col:nth-child(1) {
  flex: 1 0 48px;
  max-width: 48px;
}

.meetup-agenda__item-col:nth-child(2) {
  flex: 115px;
  max-width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.meetup-agenda__item-col:nth-child(3) {
  flex: 1 0 calc(100% - 48 - 115);
  max-width: calc(100% - 48 - 115);
  padding-left: 24px;
}

.meetup-agenda__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__lang {
  font-style: italic;
}

.meetup-agenda__dot::before {
  content: "•";
  color: var(--grey);
  padding: 0 1ch;
}

.meetup-agenda__item p {
  margin-top: 16px;
  margin-bottom: 0;
}

@media all and (min-width: 992px) {
  .meetup-agenda__item {
    padding: 40px 0;
  }
}
</style>

