<template>
  <div class="popup-new popup_users_info _active">
    <div class="popup__content">
      <div class="popup__body">
        <div
          @click="
            (e) => {
              setIsModalActive(false);
              clearCurrentUser();
            }
          "
          class="popup__close"
        ></div>
        <div class="popup__body-wrap body-wrap">
          <div class="body-wrap__top">
            <div class="body-wrap__image">
              <img :src="imageSrc" alt="user-ava" />
            </div>
            <a
              @click.prevent="$emit('set-edit-component')"
              href="#"
              class="filter__edit-link body-wrap__edit_link"
              >Редактировать</a
            >
          </div>
          <div class="body-wrap__content">
            <div class="body-wrap__line">
              <div class="body-wrap__label">ФИО</div>
              <div class="body-wrap__info">
                {{ userData.secondName }} {{ userData.firstName }}
                {{ userData.lastName }}
              </div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Email</div>
              <div class="body-wrap__info">{{ userData.email }}</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Роль</div>
              <div class="body-wrap__info">
                {{ userData.roles?.title }}
              </div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Место работы</div>
              <div class="body-wrap__info">
                {{ userData.organizationName }}
              </div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Должность</div>
              <div class="body-wrap__info">
                {{ userData.positionName }}
              </div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Регион</div>
              <div class="body-wrap__info">{{ userData.regionName }}</div>
            </div>
            <div class="body-wrap__line">
              <div class="body-wrap__label">Город</div>
              <div class="body-wrap__info">{{ userData.cityName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapMutations, mapState } = createNamespacedHelpers("users/currentUser");

export default {
  name: "cabinet-users-popup-user-info",
  methods: {
    ...mapMutations(["setIsModalActive", "clearCurrentUser"]),
  },
  computed: {
    ...mapState({
      userData: (state) => state.currentUser.form.userData,
    }),
    imageSrc: function () {
      const image = this.userData?.image;
      return image
        ? image
        : require("@/assets/images/user_avatar.png");
    },
  },
};
</script>