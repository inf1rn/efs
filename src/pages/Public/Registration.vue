
<template>
  <main class="content content_cabinet">
    <section class="interactive-map page__section page__section_margin-top-s">
      <h1 class="section-title">регистрация</h1>
      <small style="color: red"
        >При создании пользователя, пароль должен быть длиннее
        {{ v$.password.minLength.$params.min }} символов, а так же содержать
        заглавную, строчную буквы и цифры</small
      >
      <div class="filter interactive-map__filter">
        <form
          @submit.prevent
          class="tabs__body-form form account-form account-form--one"
        >
          <div class="account-form-wrap">
            <div class="account-form__row">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountSecondName" class="form__label"
                    >Фамилия</label
                  >
                  <input
                    type="text"
                    v-model="secondName"
                    v-maska="{
                      mask: 'R*',
                      tokens: {
                        R: { pattern: /[-а-яА-Я]/ },
                      },
                    }"
                    :class="{
                      invalid: v$.secondName.$dirty && v$.secondName.$error,
                    }"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountSecondName"
                    placeholder="Ваша фамилия"
                  />
                </div>
                <div class="form__item">
                  <label for="accountFirstName" class="form__label">Имя</label>
                  <input
                    v-model="firstName"
                    v-maska="{
                      mask: 'К*',
                      tokens: {
                        К: { pattern: /[а-яА-Я]/ },
                      },
                    }"
                    :class="{
                      invalid: v$.firstName.$dirty && v$.firstName.$error,
                    }"
                    type="text"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountFirstName"
                    placeholder="Ваше имя"
                  />
                </div>
                <div class="form__item">
                  <label for="accountFirstName" class="form__label"
                    >Отчество</label
                  >
                  <input
                    v-model="lastName"
                    v-maska="{
                      mask: 'К*',
                      tokens: {
                        К: { pattern: /[а-яА-Я]/ },
                      },
                    }"
                    :class="{
                      invalid: v$.lastName.$dirty && v$.lastName.$error,
                    }"
                    type="text"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountFirstName"
                    placeholder="Ваше отчество"
                  />
                </div>
                <div class="form__item form-add_photo">
                  <label
                    href="#"
                    for="downoloadInput"
                    class="filter__add-link"
                    >{{
                      newUser.image ? "добавить другое фото" : "добавить фото"
                    }}</label
                  >
                  <input
                    @change="(e) => setNewUserImage(e.target.files[0])"
                    type="file"
                    id="downoloadInput"
                    hidden
                  />
                </div>
              </div>

              <div class="account-form__line">
                <div class="form__item">
                  <label for="newUserMail" class="form__label">Email</label>
                  <!-- v-maska="{ mask: 'X*@X*.X*' }" -->
                  <input
                    v-model="email"
                    :class="{
                      invalid: v$.email.$dirty && v$.email.$error,
                    }"
                    class="form__input-edit form__input-edit_width_full"
                    id="newUserMail"
                    type="email"
                    placeholder="Email пользователя"
                    autocomplete="new-user-mail"
                  />
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountRegion" class="form__label">Регион</label>
                  <select
                    v-model="regionId"
                    :class="{
                      invalid: v$.regionId.$error,
                    }"
                    name="accountRegion"
                    class="form__select form__select_theme_white"
                  >
                    <option value="" hidden>Выберите регион</option>
                    <option
                      v-for="region in regions"
                      :value="region.id"
                      :key="region.id"
                    >
                      {{ region.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountCity" class="form__label">Город</label>
                  <select
                    v-model="cityId"
                    :class="{
                      invalid: v$.cityId.$error,
                    }"
                    name="accountCity"
                    class="form__select form__select_theme_white"
                  >
                    <option value="" hidden>Выберите город</option>
                    <option
                      v-for="city in cities"
                      :value="city.id"
                      :key="city.id"
                    >
                      {{ city.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountJob" class="form__label"
                    >Место работы</label
                  >
                  <select
                    v-model="organizationId"
                    :class="{
                      invalid: v$.organizationId.$error,
                    }"
                    name="accountJob"
                    class="form__select form__select_theme_white"
                  >
                    <option value="" hidden>Выберите место работы</option>
                    <option
                      v-for="organization in organizations"
                      :value="organization.id"
                      :key="organization.id"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountPosition" class="form__label"
                    >Должность</label
                  >
                  <select
                    v-model="positionId"
                    :class="{
                      invalid: v$.positionId.$error,
                    }"
                    name="accountPosition"
                    class="form__select form__select_theme_white"
                  >
                    <option value="" hidden>Выберите должность</option>
                    <option
                      v-for="position in positions"
                      :value="position.id"
                      :key="position.id"
                    >
                      {{ position.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="newUserPassword" class="form__label"
                    >Пароль</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    :class="{
                      invalid: v$.password.$dirty && v$.password.$error,
                    }"
                    class="form__input-edit form__input-edit_width_full"
                    id="newUserPassword"
                    placeholder="Введите пароль"
                    autocomplete="new-user-password"
                  />
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountPasswordRepeat" class="form__label"
                    >Повторите пароль</label
                  >
                  <input
                    v-model="passwordConfirm"
                    type="password"
                    :class="{
                      invalid:
                        v$.passwordConfirm.$dirty && v$.passwordConfirm.$error,
                    }"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountPasswordRepeat"
                    placeholder="Повторите пароль"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="account-form__footer">
            <div class="checkbox form-group">
              <input
                type="checkbox"
                @input="
                  (e) => {
                    setNewUserSendNotification(e.target.checked);
                    v$.sendNotification.$touch();
                  }
                "
                :checked="sendNotification"
                id="chk"
              />
              <label for="chk">Согласен на обработку персональных данных</label>
            </div>
            <div class="account-form__btn">
              <button
                type="submit"
                class="
                  button button_theme_green button_border_small
                  form__submit
                "
                @click="saveUserHandler()"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { createNamespacedHelpers } from "vuex";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const {
  mapState: mapStateNewUser,
  mapMutations: mapMutationsNewUser,
  mapActions: mapActionsNewUser,
} = createNamespacedHelpers("users/newUser");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");
const { mapState: mapStateOrganizations } =
  createNamespacedHelpers("organizations");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  name: "registration",
  title: "Регистрация",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const store = vm.$store.state;
      if (store.auth.auth) {
        vm.$router.push("/cabinet");
      }
    });
  },
  computed: {
    ...mapStateNewUser({
      newUser: (state) => state.newUser,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
      cities: (state) => state.cities,
    }),
    ...mapStateOrganizations({
      positions: (state) => state.positions,
      organizations: (state) => state.organizations,
    }),
    ...mapStateAccount({
      roles: (state) => state.roles,
    }),
    firstName: {
      get() {
        return this.newUser.firstName;
      },
      set(val) {
        this.v$.firstName.$touch();
        this.setNewUserFirstName(val);
      },
    },
    secondName: {
      get() {
        return this.newUser.secondName;
      },
      set(val) {
        this.v$.secondName.$touch();
        this.setNewUserSecondName(val);
      },
    },
    regionId: {
      get() {
        return this.newUser.regionId;
      },
      set(val) {
        this.v$.lastName.$touch();
        this.setNewUserRegionId(val);
      },
    },
    cityId: {
      get() {
        return this.newUser.cityId;
      },
      set(val) {
        this.v$.lastName.$touch();
        this.setNewUserCityId(val);
      },
    },
    organizationId: {
      get() {
        return this.newUser.organizationId;
      },
      set(val) {
        this.v$.lastName.$touch();
        this.setNewUserOrganizationId(val);
      },
    },
    positionId: {
      get() {
        return this.newUser.positionId;
      },
      set(val) {
        this.v$.lastName.$touch();
        this.setNewUserPositionId(val);
      },
    },
    lastName: {
      get() {
        return this.newUser.lastName;
      },
      set(val) {
        this.v$.lastName.$touch();
        this.setNewUserLastName(val);
      },
    },
    email: {
      get() {
        return this.newUser.email;
      },
      set(val) {
        this.v$.email.$touch();
        this.setNewUserEmail(val);
      },
    },
    password: {
      get() {
        return this.newUser.password;
      },
      set(val) {
        this.v$.password.$touch();
        this.v$.passwordConfirm.$touch();
        this.setNewUserPassword(val);
      },
    },
    passwordConfirm: {
      get() {
        return this.newUser.passwordConfirm;
      },
      set(val) {
        this.v$.passwordConfirm.$touch();
        this.setNewUserPasswordConfirm(val);
      },
    },
    sendNotification() {
      return this.newUser.sendNotification;
    },
  },
  validations() {
    return {
      firstName: { required, $lazy: true },
      secondName: { required, $lazy: true },
      lastName: { required, $lazy: true },
      email: { required, email, $lazy: true },
      password: {
        required,
        minLength: minLength(7),
        $lazy: true,
        valid: function (value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          return containsUppercase && containsLowercase && containsNumber;
        },
      },
      passwordConfirm: {
        required,
        $lazy: true,
        sameAsPassword: sameAs(this.password),
      },
      regionId: { required },
      positionId: { required },
      cityId: { required },
      organizationId: { required },
      sendNotification: { sameAs: sameAs(true) },
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods: {
    ...mapMutationsNewUser([
      "setNewUserFirstName",
      "setNewUserSecondName",
      "setNewUserLastName",
      "setNewUserEmail",
      "setNewUserImage",
      "setNewUserRegionId",
      "setNewUserCityId",
      "setNewUserOrganizationId",
      "setNewUserPositionId",
      "setNewUserPassword",
      "setNewUserPasswordConfirm",
      "setNewUserSendNotification",
    ]),
    ...mapActionsNewUser(["saveUser"]),
    async saveUserHandler() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        if (this.v$.sendNotification.$error) {
          alert("Нужно дать согласие на обработку персональных данных");
        }

        return;
      }

      this.saveUser();
    },
  },
};
</script>