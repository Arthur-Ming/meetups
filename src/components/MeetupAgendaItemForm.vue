<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <select v-model="localAgendaItem.type" class="form-control" title="Тип">
        <option v-for="(item, index) in agendaItemTypes" :key="index" :value="item.value">{{ item.text }}</option>
      </select>
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <date-input v-model="startsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <date-input v-model="endsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
    </div>

    <template v-if="localAgendaItem.type == 'other'">
      <form-group label="Заголовок">
        <app-input v-model="localAgendaItem.title" />
      </form-group>

      <form-group label="Описание">
        <app-input v-model="localAgendaItem.description" multiline rows="3" />
      </form-group>
    </template>

    <template v-else-if="localAgendaItem.type == 'talk'">
      <form-group label="Тема">
        <app-input v-model="localAgendaItem.title" />
      </form-group>

      <form-group label="Докладчик">
        <app-input v-model="localAgendaItem.speaker" />
      </form-group>

      <form-group label="Описание">
        <app-input v-model="localAgendaItem.description" multiline rows="3" />
      </form-group>

      <form-group label="Язык">
        <select v-model="localAgendaItem.language" class="form-control">
          <option v-for="(language, index) in talkLanguages" :key="index" :value="language.value">
            {{ language.text }}
          </option>
        </select>
      </form-group>
    </template>

    <template v-else>
      <form-group label="Нестандартный текст (необязательно)">
        <app-input />
      </form-group>
    </template>
  </div>
</template>

<script>
import AppIcon from './AppIcon';
import FormGroup from './FormGroup.vue';
import AppInput from './AppInput.vue';
import DateInput from './DateInput';

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppIcon, FormGroup, AppInput, DateInput },
  props: {
    agendaItem: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      agendaItemTypes: getAgendaItemTypes(),
      talkLanguages: getTalkLanguages(),
      localAgendaItem: {
        ...this.agendaItem,
      },

      durationOfAgenda: 0,
    };
  },

  computed: {
    startsAt: {
      get() {
        return this.localAgendaItem.startsAt;
      },

      set(newVal) {
        this.localAgendaItem.startsAt = newVal;

        //if (this.durationOfAgenda == 0) return;

        let startsAtHH = +this.localAgendaItem.startsAt.split(':')[0];
        let startsAtMM = this.localAgendaItem.startsAt.split(':')[1];

        let endsAtHH = startsAtHH + this.durationOfAgenda;

        if (endsAtHH > 23) endsAtHH = endsAtHH - 24;

        if (endsAtHH < 10) {
          this.localAgendaItem.endsAt = '0' + endsAtHH + ':' + startsAtMM;
        } else {
          this.localAgendaItem.endsAt = endsAtHH + ':' + startsAtMM;
        }
      },
    },

    endsAt: {
      get() {
        return this.localAgendaItem.endsAt;
      },

      set(newVal) {
        this.localAgendaItem.endsAt = newVal;
        this.durationOfAgenda = this.setDurationOfAgenda();
      },
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler(newVal) {
        this.$emit('update:agendaItem', { ...newVal });
      },
    },
  },

  created: function () {
    this.durationOfAgenda = this.setDurationOfAgenda();
  },

  methods: {
    setDurationOfAgenda() {
      let startsAtHH = +this.localAgendaItem.startsAt.split(':')[0];
      let endsAtHH = +this.localAgendaItem.endsAt.split(':')[0];

      if (endsAtHH >= startsAtHH) {
        return endsAtHH - startsAtHH;
      } else {
        return 24 + endsAtHH - startsAtHH;
      }
    },
  },
};
</script>

<style></style>
