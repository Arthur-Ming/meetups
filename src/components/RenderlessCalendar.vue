<script>
export default {
  name: 'RenderlessCalendar',

  props: {
    customDate: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
  },

  data() {
    return {
      date: this.customDate,
    };
  },

  computed: {
    currentDate() {
      return this.date.toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },

    calendar() {
      return [...this.daysBefore, ...this.daysIn, ...this.daysAfter];
    },

    currentMonth() {
      return this.date.getMonth();
    },

    year() {
      return this.date.getFullYear();
    },

    daysIn() {
      const start = 0;
      const end = this.getLastDayOfMonth(this.year, this.currentMonth);

      return this.initCalendar(start, end, this.currentMonth, false);
    },

    daysBefore() {
      const end = this.getLastDayOfMonth(this.year, this.currentMonth - 1);
      const start = end - (new Date(this.year, this.currentMonth, 1).getDay() || 7) + 1;

      return this.initCalendar(start, end, this.currentMonth - 1, true);
    },

    daysAfter() {
      const dayOfWeek = new Date(this.year, this.currentMonth + 1, 1).getDay();
      const end = dayOfWeek == 0 ? 1 : dayOfWeek == 1 ? 0 : 8 - dayOfWeek;
      const start = 0;

      return this.initCalendar(start, end, this.currentMonth + 1, true);
    },
  },

  methods: {
    monthUp() {
      this.date = new Date(this.date.setMonth(this.currentMonth + 1, 15));
    },

    monthDown() {
      this.date = new Date(this.date.setMonth(this.currentMonth - 1, 15));
    },

    getLastDayOfMonth(year, month) {
      let date = new Date(year, month + 1, 0);
      return date.getDate();
    },

    initCalendar(start, end, month, isInactive) {
      return Array.from(Array(end - start), (item, index) => ({
        day: start + index + 1,
        month: month < 0 ? 11 : month > 11 ? 0 : month,
        year: month < 0 ? this.year - 1 : month > 11 ? this.year + 1 : this.year,
        isInactive: isInactive,
      }));
    },
  },

  render(h) {
    const slotProps = {
      calendar: this.calendar,
      currentDate: this.currentDate,
      monthDown: this.monthDown,
      monthUp: this.monthUp,
    };
    return h('div', this.$scopedSlots.default(slotProps));
  },
};
</script>
