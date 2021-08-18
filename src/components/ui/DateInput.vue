<template>
  <app-input v-model="valueTr" :type="type" v-bind="$attrs">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </app-input>
</template>

<script>
import AppInput from "./AppInput";

var moment = require("moment");
export default {
  name: "DateInput",
  components: { AppInput },
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "change",
  },

  props: {
    type: {
      default: "date",
    },

    value: {},
  },

  computed: {
    valueTr: {
      get() {
        if (typeof this.value === "string") {
          return this.value;
        } else if (
          typeof this.value === "object" ||
          typeof this.value === "number"
        ) {
          if (this.type === "date") {
            return new Date(this.value).toISOString().split("T")[0];
          }
          if (this.type === "time" && this.$attrs.step === undefined) {
            return new Date(this.value).toISOString().split("T")[1].slice(0, 5);
          }
          if (this.type === "time" && this.$attrs.step !== undefined) {
            if (this.$attrs.step % 60 == 0) {
              return new Date(this.value)
                .toISOString()
                .split("T")[1]
                .slice(0, 5);
            } else {
              return new Date(this.value)
                .toISOString()
                .split("T")[1]
                .slice(0, 8);
            }
          }
          if (this.type === "datetime-local") {
            return new Date(this.value).toISOString().slice(0, 16);
          }
        }
        return null;
      },

      set(newValue) {
        this.handler(newValue);
      },
    },
  },

  methods: {
    handler(newValue) {
      if (this.valid(newValue, this.type)) {
        this.$emit("change", this.updataDate(newValue));
      } else {
        this.$emit("change", null);
      }
    },

    valid(val, valType) {
      const valTypes = {
        date: () => moment(val, "YYYY-MM-DD", true).isValid(),
        time: () => moment(val, "HH:mm", true).isValid(),
        "datetime-local": () => moment(val, moment.ISO_8601).isValid(),
      };

      return valTypes[valType]();
    },

    updataDate(newValue) {
      let date = null;
      if (this.type === "date") {
        date = new Date(newValue);
      }
      if (this.type === "time") {
        const h = newValue.split(":")[0];
        const m = newValue.split(":")[1];

        date = new Date(this.value);

        const timezoneOffset = date.getTimezoneOffset() / 60;

        date = new Date(date.setHours(h - timezoneOffset, m));
      }
      if (this.type === "datetime-local") {
        date = new Date(newValue);
        const timezoneOffset = date.getHours() - date.getTimezoneOffset() / 60;

        date = new Date(date.setHours(timezoneOffset));
      }

      const typeOfValue = typeof this.value;

      function toFormatDate() {
        if (typeOfValue === "number") {
          return Number(date);
        }
        if (typeOfValue === "object") {
          return date;
        }
        return newValue;
      }

      return toFormatDate();
    },
  },
};
</script>
