<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          v-model="params.date"
          :options="$options.dateFilterOptions"
        />
      </div>

      <div class="filters-panel__col">
        <form-group inline>
          <app-input
            id="filters-panel__search"
            v-model="params.search"
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
          <page-tabs :selected.sync="params.view" />
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
//import { fetchMeetups } from "../data";
import { meetupsApi } from "../api/meetupsApi";
//import { withProgress } from "@/helpers/withProgress.js";
import MeetupsList from "../components/layouts/MeetupsList";
import MeetupsCalendar from "../components/layouts/MeetupsCalendar";
import PageTabs from "../components/ui/PageTabs";
import FormCheck from "../components/ui/FormCheck";
import FormGroup from "../components/layouts/FormGroup";
import AppEmpty from "../components/layouts/AppEmpty";
import AppInput from "../components/ui/AppInput";
import AppIcon from "../components/ui/AppIcon";

export default {
  name: "MeetupsPage",
  components: {
    PageTabs,
    FormCheck,
    FormGroup,
    AppEmpty,
    AppIcon,
    AppInput,
  },
  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" },
  ],

  data() {
    return {
      rawMeetups: [],
      params: {
        date: "all",
        participation: "all",
        search: "",
        view: "list",
      },
    };
  },
  metaInfo() {
    return {
      title: "Митапы",
    };
  },
  watch: {
    params: {
      deep: true,
      handler() {
        const { view, date, participation, search } = this.params;

        this.$router
          .push({
            query: {
              view: view === "list" ? undefined : view,
              date: date === "all" ? undefined : date,
              participation:
                participation === "all" ? undefined : participation,
              search: search === "" ? undefined : search,
            },
          })
          .catch((error) => {
            if (error.name !== "NavigationDuplicated") {
              throw error;
            }
          });
      },
    },

    $route: {
      immediate: true,
      handler() {
        const { view, date, participation, search } = this.$route.query;
        this.params = {
          date: date === undefined ? "all" : date,
          participation: participation === undefined ? "all" : participation,
          search: search === undefined ? "" : search,
          view: view === undefined ? "list" : view,
        };
      },
    },
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
        this.params.date === "all" ||
        (this.params.date === "past" && new Date(meetup.date) <= new Date()) ||
        (this.params.date === "future" && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.params.participation === "all" ||
        (this.params.participation === "organizing" && meetup.organizing) ||
        (this.params.participation === "attending" && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(" ")
          .toLowerCase()
          .includes(this.params.search.toLowerCase());

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
      return this.params.view === "list" ? MeetupsList : MeetupsCalendar;
    },
  },
  methods: {
    setMeetups(meetup) {
      this.rawMeetups = meetup;
    },
  },

  beforeRouteEnter(to, from, next) {
    meetupsApi
      .fetchMeetups()
      .then((meetups) => {
        next((vm) => {
          vm.setMeetups(meetups);
        });
      })
      .catch(() => {
        next("notFoundPage");
      });
  },
};
</script>

<style scoped>
fieldset {
  padding: 1rem;
}
.meetup__empty {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 28px;
  color: var(--blue-2);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  margin: 32px 0;
}

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

  #filters-panel__search > .form-control {
    max-width: 100%;
  }
}
</style>
