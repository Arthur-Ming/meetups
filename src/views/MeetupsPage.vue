<template>
  <meetups-view v-bind.sync="params" />
</template>

<script>
import MeetupsView from "../components/MeetupsView";

export default {
  name: "MeetupsPage",
  components: { MeetupsView },

  data() {
    return {
      params: {
        view: this.$route.query.view,
        date: this.$route.query.date,
        participation: this.$route.query.participation,
        search: this.$route.query.search,
      },
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
      handler() {
        console.log(this.$route);
        const { view, date, participation, search } = this.$route.query;

        this.params = {
          view: view === undefined ? "list" : view,
          date: date === undefined ? "all" : date,
          participation: participation === undefined ? "all" : participation,
          search: search === undefined ? "" : search,
        };
      },
    },
  },
};
</script>

<style scoped>
</style>
