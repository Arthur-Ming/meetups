<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          v-model="filter.date"
          :options="$options.dateFilterOptions"
        />
      </div>

      <div class="filters-panel__col">
        <form-group inline>
          <app-input
            id="filters-panel__search"
            v-model="filter.search"
            type="text"
            placeholder="Поиск"
            small
            rounded
          >
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </form-group>

        <form-group inline>
          <page-tabs :selected.sync="view" />
        </form-group>
      </div>
    </div>

    <template v-if="filteredMeetups && filteredMeetups.length">
      <keep-alive>
        <component :is="viewComponent" :meetups="filteredMeetups" />
      </keep-alive>
    </template>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import { fetchMeetups } from "../data";
import MeetupsList from "../components/MeetupsList";
import MeetupsCalendar from "../components/MeetupsCalendar";
import PageTabs from "../components/PageTabs";
import FormCheck from "../components/FormCheck";
import FormGroup from "../components/FormGroup";
import AppEmpty from "../components/AppEmpty";
import AppInput from "../components/AppInput";
import AppIcon from "../components/AppIcon";

export default {
  name: "MeetupsPage",

  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" },
  ],

  components: {
    PageTabs,
    FormCheck,
    FormGroup,
    AppEmpty,
    AppIcon,
    AppInput,
  },

  data() {
    return {
      rawMeetups: [],
      filter: {
        date: "all",
        participation: "all",
        search: "",
      },

      view: "list",
    };
  },

  computed: {
    meetups() {
      return this.rawMeetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId
          ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}`
          : undefined,
        coverStyle: meetup.imageId
          ? {
              "--bg-url": `url('https://course-vue.javascript.ru/api/images/${meetup.imageId}')`,
            }
          : {},
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        dateOnlyString: new Date(meetup.date).toISOString().split("T"),
      }));
    },

    filteredMeetups() {
      const dateFilter = (meetup) =>
        this.filter.date === "all" ||
        (this.filter.date === "past" && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === "future" && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.filter.participation === "all" ||
        (this.filter.participation === "organizing" && meetup.organizing) ||
        (this.filter.participation === "attending" && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(" ")
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      console.log(this.rawMeetups);
      /*  console.log(
        this.meetups
          .filter(
            (meetup) =>
              dateFilter(meetup) &&
              participationFilter(meetup) &&
              searchFilter(meetup)
          )
          .sort(({ date: a }, { date: b }) => b - a)
      ); */

      return this.meetups
        .filter(
          (meetup) =>
            dateFilter(meetup) &&
            participationFilter(meetup) &&
            searchFilter(meetup)
        )
        .sort((a, b) => b.date - a.date);
    },
    viewComponent() {
      return this.view === "list" ? MeetupsList : MeetupsCalendar;
    },
  },

  mounted() {
    this.fetchMeetups();
  },

  methods: {
    async fetchMeetups() {
      this.rawMeetups = await fetchMeetups();
    },
  },
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search >>> .form-control {
    max-width: 100%;
  }
}
</style>
