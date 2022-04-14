<template>
  <main class="content content_theme_ornament">
    <section class="auth">
      <h1 class="section-title section-title_text-align_center">Авторизация</h1>
      <form
        @submit.prevent
        class="form form_type_auth form-width-xs form_centered auth__form"
      >
        <fieldset class="form__fieldset">
          <div class="form__item">
            <label for="auth-login" class="form__label">Имя пользователя</label>
            <input
              v-model.trim="login"
              type="text"
              name="auth-login"
              class="form__input-edit form__input-edit_el_auth-login input _req"
              id="auth-login"
              :class="{
                invalid: v$.login.$dirty && v$.login.$error,
              }"
            />
            <small v-if="v$.login.$dirty && v$.login.$invalid"
              ><i>Введите корректный email</i></small
            >
          </div>
          <div class="form__item">
            <label for="auth-password" class="form__label">Пароль</label>
            <input
              v-model.trim="password"
              type="password"
              name="auth-password"
              class="form__input-edit form__input-edit_el_auth-password _req"
              id="auth-password input"
              :class="{
                invalid: v$.password.$dirty && v$.password.$error,
              }"
            />
            <small v-if="v$.login.$dirty && v$.password.$invalid"
              ><i>Длина пароля должна быть не менее {{v$.password.minLength.$params.min}} символов</i></small
            >
          </div>
        </fieldset>
        <fieldset class="form__fieldset form__fieldset_type_button-area">
          <button
            @click="auth()"
            type="submit"
            class="button button_theme_green button_border_rounded form__submit"
          >
            Войти
          </button>
        </fieldset>
        <fieldset class="form__fieldset form__fieldset_type_button-area">
          <router-link
            to="/sign-up"
            tag="button"
            type="submit"
            class="button button_theme_green button_border_rounded form__submit"
          >
            Регистрация
          </router-link>
        </fieldset>
        <div class="form__footer">
          <a href="#" class="form__oauth-link">Войти с помощью oauth 2.0</a>
          <p class="form__footer-text">
            Если возникли проблемы со входом обратитесь в
            <a
              href="#"
              class="form__footer-link"
              @click="() => setIsOpened(true)"
              >Службу поддержки</a
            >
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers("auth");

export default {
  name: "auth",
  title: "Авторизация",
  validations() {
    return {
      login: { required, email, $lazy: true },
      password: { required, minLength: minLength(6), $lazy: true },
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.loginFormData,
    }),
    login: {
      get() {
        return this.form.login;
      },
      set(login) {
        this.setLogin(login);
        this.v$.login.$touch();
      },
    },
    password: {
      get() {
        return this.form.password;
      },
      set(password) {
        this.setPassword(password);
        this.v$.password.$touch();
      },
    },
  },
  methods: {
    ...mapMutations({
      setLogin: "setLogin",
      setPassword: "setPassword",
      setIsOpened: "technicalSupport/setIsOpened",
    }),
    ...mapActions({
      setAuth: "auth",
    }),
    async auth() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.setAuth();
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const store = vm.$store.state;
      if (store.auth.auth) {
        vm.$router.push("/cabinet");
      }
    });
  },
};
</script>