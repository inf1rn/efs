<template>
  <div class="tabs__body _tabs-block _active">
    <div class="body-wrap__top">
      <div class="body-wrap__image">
        <img :src="imageSrc" alt="user-ava" />
      </div>
      <label
        for="downoloadImageInput"
        class="filter__edit-link body-wrap__edit_link"
        >Редактировать</label
      >
      <input
        id="downoloadImageInput"
        @change="(e) => setCurrentUserImage(e.target.files[0])"
        type="file"
        hidden
      />
    </div>
    <form class="tabs__body-form form user_tabs-form user_tabs-form--one">
      <div class="user_tabs-form-wrap">
        <div class="user_tabs-form__row">
          <div class="user_tabs-form__col">
            <div class="user_tabs-form__line form__item">
              <label for="userTabsSecondName" class="form__label"
                >Фамилия</label
              >
              <input
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsSecondName"
                placeholder="Ваша фамилия"
                :value="userData.secondName"
                @input="(e) => setCurrentUserSecondName(e.target.value)"
                v-maska="{
                  mask: 'К*',
                  tokens: {
                    К: { pattern: /[а-яА-Я]/ },
                  },
                }"
              />
            </div>
            <div class="user_tabs-form__line form__item">
              <label for="userTabsFirstName" class="form__label">Имя</label>
              <input
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsFirstName"
                placeholder="Ваше имя"
                :value="userData.firstName"
                @input="(e) => setCurrentUserFirstName(e.target.value)"
                v-maska="{
                  mask: 'К*',
                  tokens: {
                    К: { pattern: /[а-яА-Я]/ },
                  },
                }"
              />
            </div>
            <div class="user_tabs-form__line form__item">
              <label for="userTabsPatronymic" class="form__label"
                >Отчество</label
              >
              <input
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsPatronymic"
                placeholder="Ваше отчество"
                :value="userData.lastName"
                @input="(e) => setCurrentUserLastName(e.target.value)"
                v-maska="{
                  mask: 'К*',
                  tokens: {
                    К: { pattern: /[а-яА-Я]/ },
                  },
                }"
              />
            </div>
          </div>
          <div class="user_tabs-form__col">
            <div class="user_tabs-form__line form__item">
              <label for="userTabsMail" class="form__label">Email</label>
              <input
                type="email"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsMail"
                placeholder="Email пользователя"
                :value="userData.email"
                @input="(e) => setCurrentUserEmail(e.target.value)"
              />
            </div>
            <div class="user_tabs-form__line form__item">
              <label for="userTabsRole" class="form__label">Роль</label>
              <select
                class="form__input-edit form__input-edit_width_full"
                id="userTabsRole"
                placeholder="Выберите роль"
                @change="
                  (e) => setCurrentUserRoles([getRoleById(+e.target.value)])
                "
                :value="userData.roles[0]?.id"
              >
                <option :value="role.id" v-for="role in roles" :key="role.id">
                  {{ role.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="user_tabs-form__row">
          <div class="user_tabs-form__col">
            <div class="user_tabs-form__line form__item">
              <label for="userTabsRegion" class="form__label">Регион</label>
              <select
                type="mail"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsRegion"
                placeholder="Выберите регион"
                :value="userData.regionId"
                @change="(e) => setCurrentUserRegionId(e.target.value)"
              >
                <option
                  :value="region.id"
                  v-for="region in regions"
                  :key="region.id"
                >
                  {{ region.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="user_tabs-form__col">
            <div class="user_tabs-form__line form__item">
              <label for="userTabsCity" class="form__label">Город</label>
              <select
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsCity"
                placeholder="Выберите город"
                :value="userData.cityId"
                @change="(e) => setCurrentUserCityId(e.target.value)"
              >
                <option :value="city.id" v-for="city in cities" :key="city.id">
                  {{ city.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="user_tabs-form__row">
          <div class="user_tabs-form__col">
            <div class="user_tabs-form__line form__item">
              <label for="userTabsJob" class="form__label">Место работы</label>
              <select
                type="mail"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsJob"
                placeholder="Название организации"
                :value="userData.organizationId"
                @change="(e) => setCurrentUserOrganizationId(e.target.value)"
              >
                <option
                  :value="organization.id"
                  v-for="organization in organizations"
                  :key="organization.id"
                >
                  {{ organization.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="user_tabs-form__col">
            <div class="user_tabs-form__line form__item">
              <label for="userTabsPosition" class="form__label"
                >Должность</label
              >
              <select
                type="text"
                class="form__input-edit form__input-edit_width_full"
                id="userTabsPosition"
                placeholder="Выберите должность"
                :value="userData.positionId"
                @change="(e) => setCurrentUserPositionId(e.target.value)"
              >
                <option
                  :value="position.id"
                  v-for="position in positions"
                  :key="position.id"
                >
                  {{ position.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="user_tabs-form__footer">
        <div class="checkbox form-group">
          <input
            @change="(e) => setCurrentUserSendNotification(e.target.checked)"
            :checked="sendNotification"
            type="checkbox"
            id="chk"
          />
          <label for="chk">Отправить уведомление на email пользователя</label>
        </div>
        <div class="user_tabs-form__btn">
          <button
            type="submit"
            class="button button_theme_green button_border_small form__submit"
            @click.prevent="saveUserInfo()"
          >
            Подтвердить изменения
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import avatar from "@/assets/images/avatar.jpg"

const {
  mapState: mapStateUsers,
  mapMutations: mapMutationsUsers,
  mapActions: mapActionsUsers,
} = createNamespacedHelpers("users/currentUser");

const { mapState: mapStateLocation } = createNamespacedHelpers("location");
const { mapState: mapStateAccount, mapGetters: mapGettersAccount } =
  createNamespacedHelpers("account");
const { mapState: mapStateOrganizations } =
  createNamespacedHelpers("organizations");

export default {
  name: "cabinet-users-popup-edit-user-info",
  computed: {
    ...mapStateUsers({
      userData: (state) => state.currentUser.form.userData,
      sendNotification: (state) => state.currentUser.sendNotification,
    }),
    ...mapStateLocation({
      cities: (state) => state.cities,
      regions: (state) => state.regions,
    }),
    ...mapStateOrganizations({
      positions: (state) => state.positions,
      organizations: (state) => state.organizations,
    }),
    ...mapStateAccount({
      roles: (state) => state.roles,
    }),
    ...mapGettersAccount(["getRoleById"]),
    imageSrc: function () {
      const image = this.userData?.image;

      if (typeof image === "object" && image && image !== 'null') {
        return URL.createObjectURL(new Blob([image], { type: "image/*" }));
      }

      return image && image !== 'null' ? image : avatar;
    },
  },
  methods: {
    ...mapMutationsUsers([
      "setCurrentUserFirstName",
      "setCurrentUserLastName",
      "setCurrentUserSecondName",
      "setCurrentUserRegionId",
      "setCurrentUserOrganizationId",
      "setCurrentUserCityId",
      "setCurrentUserPositionId",
      "setCurrentUserImage",
      "setCurrentUserSendNotification",
      "setCurrentUserEmail",
      "setCurrentUserRoles",
    ]),
    ...mapActionsUsers(["saveUserInfo"]),
  },
};
</script>