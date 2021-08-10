<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button
        v-model="localAgendaItem.type"
        title="Тип"
        :options="$options.agendaItemTypeOptions"
      />
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

    <form-group
      v-for="(item, index) in $options.fieldSpecifications[
        localAgendaItem.type
      ]"
      :key="index"
      :label="item.title"
    >
      <component
        :is="item.component"
        v-bind="item.props"
        :[item.model.prop]="localAgendaItem[item.field]"
        @[item.model.event]="localAgendaItem[item.field] = $event"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from "@/components/ui/AppInput";
import DropdownButton from "@/components/ui/DropdownButton";
import AppIcon from "@/components/ui/AppIcon";
import FormGroup from "./FormGroup";
import DateInput from "@/components/ui/DateInput";
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypeOptions,
} from "@/services/MeetupService";

export default {
  name: "MeetupAgendaItemForm",

  components: { FormGroup, AppIcon, AppInput, DropdownButton, DateInput },

  agendaItemTypeOptions: getAgendaItemTypeOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
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

        let startsAtHH = +this.localAgendaItem.startsAt.split(":")[0];
        let startsAtMM = this.localAgendaItem.startsAt.split(":")[1];

        let endsAtHH = startsAtHH + this.durationOfAgenda;

        if (endsAtHH > 23) endsAtHH = endsAtHH - 24;

        if (endsAtHH < 10) {
          this.localAgendaItem.endsAt = "0" + endsAtHH + ":" + startsAtMM;
        } else {
          this.localAgendaItem.endsAt = endsAtHH + ":" + startsAtMM;
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
        this.$emit("update:agendaItem", { ...newVal });
      },
    },
  },

  created: function () {
    this.durationOfAgenda = this.setDurationOfAgenda();
  },

  methods: {
    setDurationOfAgenda() {
      let startsAtHH = +this.localAgendaItem.startsAt.split(":")[0];
      let endsAtHH = +this.localAgendaItem.endsAt.split(":")[0];

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
