<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">Регистрация</h1>

      <form class="form" @submit.prevent="submitForm">
        <form-group label="Email">
          <app-input v-model="user.email" type="email" />
        </form-group>

        <form-group label="Имя">
          <app-input v-model="user.fullName" type="text" />
        </form-group>

        <form-group label="Пароль">
          <app-input v-model="user.password" type="password" />
        </form-group>

        <form-group label="Повтор пароля">
          <app-input v-model="user.password_repeat" type="password" />
        </form-group>

        <form-group>
          <app-checkbox v-model="user.agreement">
            Я согласен с условиями
          </app-checkbox>
        </form-group>

        <div class="form__buttons">
          <primary-button block>Зарегистрироваться</primary-button>
        </div>

        <div class="form__append">
          Уже есть аккаунт?
          <router-link to="/login" class="link">Войдите</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormGroup from "../components/FormGroup";
import AppInput from "../components/AppInput";
import AppCheckbox from "../components/AppCheckbox";
import PrimaryButton from "../components/PrimaryButton";
import { register } from "../data";

const errorTypes = {
  fullName: "Требуется ввести полное имя",
  email: "Требуется ввести Email",
  password: "Требуется ввести пароль",
  password_repeat: "Пароли не совпадают",
  agreement: "Требуется согласиться с условиями",
};

export default {
  name: "RegisterPage",
  components: {
    FormGroup,
    AppInput,
    AppCheckbox,
    PrimaryButton,
  },
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        password: "",
        password_repeat: "",
        agreement: false,
      },
    };
  },

  methods: {
    submitForm() {
      if (this.isFormValidated()) {
        register(this.user.email, this.user.fullName, this.user.password).then(
          (res) => {
            if (res.id !== undefined) {
              alert(res.id);
              this.$router.push("/login");
            } else {
              alert(res.message);
            }
          }
        );
      }
    },

    isFormValidated() {
      let err = null;

      if (this.user.email === "") err = "email";
      else if (this.user.fullName === "") err = "fullName";
      else if (this.user.password === "") err = "password";
      else if (this.user.password !== this.user.password_repeat)
        err = "password_repeat";
      else if (!this.user.agreement) err = "agreement";

      if (err) {
        alert(errorTypes[err]);
        return false;
      }

      return true;
    },
  },
};
</script>

<style></style>
