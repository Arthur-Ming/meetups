<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">{{ title }}</h1>
      <form class="form" @submit.prevent="submitForm">
        <form-group label="Email">
          <app-input
            v-model="user.email"
            type="email"
            placeholder="demo@email"
          />
        </form-group>
        <form-group label="Пароль">
          <app-input
            v-model="user.password"
            type="password"
            placeholder="password"
          />
        </form-group>
        <div class="form__buttons">
          <primary-button block>Войти</primary-button>
        </div>
        <div class="form__append">
          Нет аккаунта?
          <router-link :to="{ name: 'register' }" class="link">
            Зарегистрируйтесь
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormGroup from "../components/layouts/FormGroup";
import AppInput from "../components/ui/AppInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { authApi } from "@/api/authApi";
import { withProgress } from "@/helpers/withProgress.js";
//import { login } from "../data";

export default {
  name: "LoginPage",

  components: {
    FormGroup,
    AppInput,
    PrimaryButton,
  },
  data() {
    return {
      title: "Вход",
      user: {
        email: "demo@email",
        password: "password",
      },
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  methods: {
    async submitForm() {
      if (this.user.email === "") {
        //  alert("Требуется ввести Email");
        this.$toaster.error("Требуется ввести Email");
        return;
      } else if (this.user.password === "") {
        this.$toaster.error("Требуется ввести пароль");
        // alert("Требуется ввести пароль");
        return;
      }
      try {
        await withProgress(authApi.login(this.user.email, this.user.password));

        if (this.$route.query.from !== undefined) {
          this.$router.push(this.$route.query.from);
        } else {
          this.$router.push({ name: "index" });
        }
        this.$toaster.success("Авторизация прошла успешно!");
      } catch (error) {
        this.$toaster.error(error.body.message);

        throw error;
      }
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>

