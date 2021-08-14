<template>
  <header class="header">
    <h1>
      <router-link :to="{ name: 'index' }"
        ><img src="@/assets/logo.svg" alt="Meetups"
      /></router-link>
    </h1>
    <nav>
      <router-link v-if="showReturnToMeetups" :to="{ name: 'meetups' }">
        &larr; Вернуться к списку
      </router-link>
      <router-link
        :to="{ name: 'meetups', query: { participation: 'attending' } }"
        v-if="isAuthenticated"
      >
        Мои митапы
      </router-link>

      <router-link
        :to="{ name: 'meetups', query: { participation: 'organizing' } }"
        v-if="isAuthenticated"
      >
        Организуемые митапы
      </router-link>

      <router-link :to="{ name: 'login' }" v-if="!isAuthenticated"
        >Вход</router-link
      >
      <router-link :to="{ name: 'register' }">Регистрация</router-link>
      <router-link :to="{ name: 'meetups_create' }">Создать митап</router-link>
      <router-link
        :to="{ name: 'exit' }"
        v-if="isAuthenticated"
        @click.native="logout"
        >Выйти</router-link
      >
    </nav>
  </header>
</template>

<script>
import store from "@/store/index.js";
import { withProgress } from "@/helpers/withProgress.js";

export default {
  name: "TheHeader",
  computed: {
    showReturnToMeetups() {
      return this.$route.matched.some(
        (route) => route.meta.showReturnToMeetups
      );
    },
    isAuthenticated() {
      return store.getters["auth/IS_AUTHENTICATED"];
    },
  },
  methods: {
    async logout() {
      try {
        await withProgress(store.dispatch("auth/LOGOUT"));
        this.$router.push({ name: "login" });
        location.reload();
      } catch (error) {
        this.$toaster.error(error.message);
      }
    },
  },
};
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}

.header h1,
.header h1 a {
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}

nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

nav a {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

nav a + a {
  margin-top: 8px;
}

nav a:hover {
  color: var(--blue);
}

nav a:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  nav a,
  nav a + a {
    margin-top: 0;
  }

  nav a:first-child:before {
    display: none;
  }
}

.avatar {
  border-radius: 100%;
  margin-right: 8px;
}
</style>
