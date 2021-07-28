<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <form-group label="Название">
          <app-input v-model="localMeetup.title" />
        </form-group>
        <form-group label="Дата">
          <date-input v-model="localMeetup.date" />
        </form-group>
        <form-group label="Место">
          <app-input v-model="localMeetup.place" />
        </form-group>
        <form-group label="Описание">
          <app-input v-model="localMeetup.description" multiline rows="3" />
        </form-group>

        <form-group label="Изображение">
          <div class="input-group">
            <image-uploader v-model="localMeetup.imageId" />
          </div>
        </form-group>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        class="mb-3"
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem(index, $event)"
        @remove="removeAgendaItem(index)"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from "./MeetupAgendaItemForm.vue";
import FormGroup from "./FormGroup.vue";
import AppInput from "./AppInput.vue";
import ImageUploader from "./ImageUploader";
import DateInput from "./DateInput";

const _ = require("lodash");

let lastId = 0;

function createAgendaItem() {
  return {
    id: lastId++,
    startsAt: "00:00",
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: "MeetupForm",
  components: {
    ImageUploader,
    MeetupAgendaItemForm,
    FormGroup,
    AppInput,
    DateInput,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
    },
  },

  data() {
    return {
      localMeetup: {
        ..._.cloneDeep(this.meetup),
        agenda: [createAgendaItem()],
      },
    };
  },

  methods: {
    addAgendaItem() {
      let newItem;

      if (this.localMeetup.agenda.length > 0) {
        newItem = {
          ...createAgendaItem(),
          startsAt:
            this.localMeetup.agenda[this.localMeetup.agenda.length - 1].endsAt,
        };
      } else newItem = createAgendaItem();
      this.localMeetup.agenda.push(newItem);
    },

    handleSubmit() {
      this.$emit("submit", _.cloneDeep(this.localMeetup));
    },

    removeAgendaItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },

    updateAgendaItem(idx, newItem) {
      this.localMeetup.agenda.splice(idx, 1, newItem);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
