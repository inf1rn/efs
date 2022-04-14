<template>
  <main class="content content_cabinet">
    <section class="interactive-map page__section page__section_margin-top-s">
      <h1 class="section-title">создать пользователя</h1>
      <small style="color: red"
        >При создании пользователя, пароль должен быть длиннее 7 символов, а так
        же содержать заглавную, строчную буквы и цифры</small
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
                    :value="secondName"
                    @input="(e) => setNewUserSecondName(e.target.value)"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountSecondName"
                    placeholder="Ваша фамилия"
                  />
                </div>
                <div class="form__item">
                  <label for="accountFirstName" class="form__label">Имя</label>
                  <input
                    :value="firstName"
                    @input="(e) => setNewUserFirstName(e.target.value)"
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
                    :value="lastName"
                    @input="(e) => setNewUserLastName(e.target.value)"
                    type="text"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountFirstName"
                    placeholder="Ваше имя"
                  />
                </div>
                <div class="form__item form-add_photo">
                  <label
                    href="#"
                    for="downoloadInput"
                    class="filter__add-link"
                    >{{
                      image ? "добавить другое фото" : "добавить фото"
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
                  <input
                    :value="email"
                    @input="(e) => setNewUserEmail(e.target.value)"
                    class="form__input-edit form__input-edit_width_full"
                    id="newUserMail"
                    placeholder="Email пользователя"
                    autocomplete="new-user-mail"
                  />
                </div>
                <div class="form__item">
                  <label for="accountRole" class="form__label">Роль</label>
                  <select
                    :value="newUserRole"
                    @change="(e) => setNewUserRole(e.target.value)"
                    name="accountJob"
                    class="form__select form__select_theme_white"
                  >
                    <option value="" hidden>Выберите роль</option>
                    <option
                      v-for="role in roles"
                      :value="role.name"
                      :key="role.title"
                    >
                      {{ role.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountRegion" class="form__label">Регион</label>
                  <select
                    :value="regionId"
                    @change="(e) => setNewUserRegionId(e.target.value)"
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
                    :value="cityId"
                    @change="(e) => setNewUserCityId(e.target.value)"
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
                    :value="organizationId"
                    @change="(e) => setNewUserOrganizationId(e.target.value)"
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
                    :value="positionId"
                    @change="(e) => setNewUserPositionId(e.target.value)"
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
                    @input="(e) => setNewUserPassword(e.target.value)"
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
                    @input="(e) => setNewUserPasswordConfirm(e.target.value)"
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
                @input="(e) => setNewUserSendNotification(e.target.checked)"
                :checked="sendNotification"
                id="chk"
              />
              <label for="chk"
                >Отправить уведомление на email пользователя</label
              >
            </div>
            <div class="account-form__btn">
              <button
                type="submit"
                class="
                  button button_theme_green button_border_small
                  form__submit
                "
                @click="saveUser()"
              >
                Создать пользователя
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

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
  name: "cabinet-new-user",
  title: "Новый пользователь",
  computed: {
    ...mapStateNewUser({
      firstName: (state) => state.newUser.firstName,
      lastName: (state) => state.newUser.lastName,
      secondName: (state) => state.newUser.secondName,
      email: (state) => state.newUser.email,
      image: (state) => state.newUser.image,
      newUserRole: (state) => state.newUser.role,
      regionId: (state) => state.newUser.regionId,
      cityId: (state) => state.newUser.cityId,
      organizationId: (state) => state.newUser.organizationId,
      positionId: (state) => state.newUser.positionId,
      password: (state) => state.newUser.password,
      passwordConfirm: (state) => state.newUser.passwordConfirm,
      sendNotification: (state) => state.newUser.sendNotification,
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
  },
  methods: {
    ...mapMutationsNewUser([
      "setNewUserFirstName",
      "setNewUserSecondName",
      "setNewUserLastName",
      "setNewUserEmail",
      "setNewUserRole",
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
  },
};
</script>