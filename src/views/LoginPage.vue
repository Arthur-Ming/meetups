<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">Вход</h1>
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
import FormGroup from "../components/FormGroup";
import AppInput from "../components/AppInput";
import PrimaryButton from "../components/PrimaryButton";
import { login } from "../data";

export default {
  name: "LoginPage",

  components: {
    FormGroup,
    AppInput,
    PrimaryButton,
  },
  data() {
    return {
      user: {
        email: "demo@email",
        password: "password",
      },
    };
  },

  methods: {
    submitForm() {
      if (this.user.email === "") {
        alert("Требуется ввести Email");
        return;
      } else if (this.user.password === "") {
        alert("Требуется ввести пароль");
        return;
      }

      login(this.user.email, this.user.password).then((res) => {
        if (res.fullname !== undefined) {
          alert(res.fullname);
          if (this.$route.query.from !== undefined) {
            this.$router.push(this.$route.query.from);
          } else {
            this.$router.push("/");
          }
        } else alert(res.message);
      });
    },
  },
};
</script>
<style scoped>
</style>
