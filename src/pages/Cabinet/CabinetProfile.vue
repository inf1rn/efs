<template>
  <main class="content content_cabinet">
    <section class="profile page__section">
      <h1 class="section-title mb-50">профиль</h1>
      <div class="profile__wrapper wrapper-max_width-m">
        <div class="profile__row profile__top top-profile">
          <div class="top-profile__job">{{ userData?.roles.title }}</div>
          <div class="top-profile__images">
            <img :src="imageSrc" alt="user-ava" v-if="userData" />
          </div>
          <div class="top-profile__btn">
            <button
              type="submit"
              class="
                button
                button_theme_green--empty
                button_border_small
                form__submit
              "
              @click="loadImage"
            >
              Загрузить фото
            </button>
            <input
              type="file"
              style="display: none"
              ref="downoloadInput"
              @change="
                (e) => e.target.files.length && saveUserImage(e.target.files[0])
              "
            />
          </div>
        </div>
        <div class="profile__row profile__bottom bottom-profile">
          <div class="tabs profile__tabs _tabs">
            <nav class="tabs__navigation">
              <button
                @click="() => setActiveTab('userData')"
                type="submit"
                class="tabs__title _tabs-item"
                :class="{ _active: activeTab === 'userData' }"
              >
                Личные данные
              </button>
              <button
                @click="() => setActiveTab('changePassword')"
                type="submit"
                class="tabs__title _tabs-item"
                :class="{ _active: activeTab === 'changePassword' }"
              >
                Сменить пароль
              </button>
            </nav>
            <div class="tabs__content">
              <div
                v-if="activeTab === 'userData'"
                class="tabs__body _tabs-block _active"
              >
                <form
                  @submit.prevent
                  class="
                    tabs__body-form
                    form
                    profile_tabs-form profile_tabs-form--one
                  "
                >
                  <div class="profile_tabs-form-wrap">
                    <div class="profile_tabs-form__row">
                      <div class="profile_tabs-form__line form__item">
                        <label class="form__label">Email</label>
                        <span>{{ userData?.email }}</span>
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsSecondName" class="form__label"
                          >Фамилия</label
                        >
                        <textarea
                          type="text"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsSecondName"
                          :value="userData?.secondName"
                          @input="(e) => setSecondName(e.target.value)"
                          placeholder="Ваша фамилия"
                        />
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsFirstName" class="form__label"
                          >Имя</label
                        >
                        <textarea
                          type="text"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsFirstName"
                          :value="userData?.firstName"
                          @input="(e) => setFirstName(e.target.value)"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsPatronymic" class="form__label"
                          >Отчество</label
                        >
                        <textarea
                          type="text"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsPatronymic"
                          :value="userData?.lastName"
                          @input="(e) => setLastName(e.target.value)"
                          placeholder="Ваше отчество"
                        />
                      </div>
                    </div>

                    <div class="profile_tabs-form__row">
                      <div class="profile_tabs-form__line form__item">
                        <label class="form__label">Регион, Город</label>
                        <span
                          >{{ userData?.regionName }},
                          {{ userData?.cityName }}</span
                        >
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsJob" class="form__label"
                          >Место работы</label
                        >
                        <select
                          type="text"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsJob"
                          :value="userData?.organizationId"
                          @input="(e) => setOrganizationId(e.target.value)"
                          placeholder="Название организации"
                        >
                          <option
                            v-for="organization in organizations"
                            :value="organization.id"
                            :key="organization.id"
                          >
                            {{ organization.title }}
                          </option>
                        </select>
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsPosition" class="form__label"
                          >Должность</label
                        >
                        <select
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsPosition"
                          :value="userData?.positionId"
                          @input="(e) => setPositionId(e.target.value)"
                          placeholder="Выберите должность"
                        >
                          >
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
                  <div class="profile_tabs-form__btn">
                    <button
                      type="submit"
                      @click="saveUserData"
                      class="
                        button button_theme_green button_border_small
                        form__submit
                      "
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </form>
              </div>
              <div
                v-if="activeTab === 'changePassword'"
                class="tabs__body _tabs-block _active"
              >
                <form
                  @submit.prevent
                  class="
                    tabs__body-form
                    form
                    profile_tabs-form profile_tabs-form--two
                  "
                >
                  <div class="profile_tabs-form-wrap">
                    <div class="profile_tabs-form__row">
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsPasswordOld" class="form__label"
                          >Старый пароль</label
                        >
                        <input
                          type="password"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsPasswordOld"
                          :value="formPassword.oldPassword"
                          @input="(e) => setOldPassword(e.target.value)"
                          placeholder="Ваш старый пароль"
                        />
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label for="profileTabsPasswordNew" class="form__label"
                          >Новый пароль</label
                        >
                        <input
                          type="password"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsPasswordNew"
                          placeholder="Ваш новый пароль"
                          :value="formPassword.newPassword"
                          @input="(e) => setNewPassword(e.target.value)"
                        />
                      </div>
                      <div class="profile_tabs-form__line form__item">
                        <label
                          for="profileTabsPasswordNewRepeat"
                          class="form__label"
                          >Повторить новый пароль</label
                        >
                        <input
                          type="password"
                          class="form__input-edit form__input-edit_width_full"
                          id="profileTabsPasswordNewRepeat"
                          placeholder="Повторить ваш новый пароль"
                          :value="formPassword.passwordConfirm"
                          @input="(e) => setPasswordConfirm(e.target.value)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="profile_tabs-form__btn">
                    <button
                      type="submit"
                      class="
                        button button_theme_green button_border_small
                        form__submit
                      "
                      @click="changePassword"
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapActions: mapActionsProfile,
  mapMutations: mapMutationsProfile,
  mapState: mapStateProfile,
} = createNamespacedHelpers("profile");
const { mapState: mapStateOrganizations } =
  createNamespacedHelpers("organizations");
const { mapGetters: mapGettersAccount } = createNamespacedHelpers("account");

export default {
  name: "CabinetProfile",
  data() {
    return {
      activeTab: "userData",
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    ...mapGettersAccount(["getRoleById"]),
    ...mapActionsProfile({
      saveUserData: "saveUserData",
      saveUserImage: "saveUserImage",
      changePassword: "changePassword",
    }),
    ...mapMutationsProfile({
      setFirstName: "setFirstName",
      setSecondName: "setSecondName",
      setLastName: "setLastName",
      setNewPassword: "setNewPassword",
      setPasswordConfirm: "setPasswordConfirm",
      setOldPassword: "setOldPassword",
      setPosition: "setPosition",
      setOrganization: "setOrganization",
    }),
    loadImage() {
      this.$refs.downoloadInput.click();
    },
  },
  computed: {
    ...mapStateProfile({
      userData: (state) => state.formData,
      formPassword: (state) => state.formPassword,
    }),
    ...mapStateOrganizations({
      positions: (state) => state.positions,
      organizations: (state) => state.organizations,
    }),
    title() {
      return this.userData?.firstName + " " + this.userData?.secondName;
    },
    imageSrc: function () {
      const image = this.userData?.image;
      return image ? image : "@/assets/images/user_avatar.png";
    },
  },
};
</script>
