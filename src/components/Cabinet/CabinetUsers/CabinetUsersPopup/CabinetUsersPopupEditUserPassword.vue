<template>
  <div class="tabs__body _tabs-block">
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
        type="file"
        @change="(e) => setCurrentUserImage(e.target.files[0])"
        hidden
      />
    </div>
    <form class="tabs__body-form form user_tabs-form user_tabs-form--two">
      <div class="user_tabs-form-wrap">
        <div class="user_tabs-form__row">
          <div class="user_tabs-form__line form__item">
            <label for="userTabsPasswordNew" class="form__label"
              >Новый пароль</label
            >
            <input
              type="password"
              class="form__input-edit form__input-edit_width_full"
              id="userTabsPasswordNew"
              placeholder="Ваш новый пароль"
              :value="password.newPassword"
              @input="(e) => setCurrentUserNewPassword(e.target.value)"
            />
          </div>
          <div class="user_tabs-form__line form__item">
            <label for="userTabsPasswordNewRepeat" class="form__label"
              >Повторить новый пароль</label
            >
            <input
              type="password"
              class="form__input-edit form__input-edit_width_full"
              id="userTabsPasswordNewRepeat"
              placeholder="Повторить ваш новый пароль"
              :value="password.passwordConfirm"
              @input="(e) => setCurrentUserPasswordConfirm(e.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="user_tabs-form__footer">
        <div class="checkbox form-group">
          <input
            :checked="sendNotification"
            @change="(e) => setCurrentUserSendNotification(e.target.checked)"
            type="checkbox"
            id="chk"
          />
          <label for="chk">Отправить уведомление на email пользователя</label>
        </div>
        <div class="user_tabs-form__btn">
          <button
            type="submit"
            class="button button_theme_green button_border_small form__submit"
            @click.prevent="saveUserPassword()"
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

const { mapState, mapMutations, mapActions } =
  createNamespacedHelpers("users/currentUser");

export default {
  name: "cabinet-users-popup-edit-user-password",
  computed: {
    ...mapState({
      userData: (state) => state.currentUser.form.userData,
      password: (state) => state.currentUser.form.password,
      sendNotification: (state) => state.currentUser.sendNotification,
    }),
    imageSrc: function () {
      const image = this.userData?.image;

      if (typeof image === "object" && image) {
        return URL.createObjectURL(new Blob([image], { type: "image/*" }));
      }

      return image
        ? image
        : require("@/assets/images/user_avatar.png");
    },
  },
  methods: {
    ...mapMutations([
      "setCurrentUserSendNotification",
      "setCurrentUserNewPassword",
      "setCurrentUserPasswordConfirm",
      "setCurrentUserImage",
    ]),
    ...mapActions(["saveUserPassword"]),
  },
};
</script>