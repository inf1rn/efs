<template>
  <div class="popup-new popup_users_info--edit _active">
    <div class="popup__content">
      <div class="popup__body">
        <div
          @click="
            (e) => {
              setIsModalActive(false);
              clearCurrentUser()
            }
          "
          class="popup__close"
        ></div>
        <div class="popup__body-wrap body-wrap">
          <div class="body-wrap__content">
            <div class="tabs users__tabs _tabs">
              <nav class="tabs__navigation">
                <button
                  type="submit"
                  class="tabs__title _tabs-item"
                  @click="activeTab = 'cabinet-users-popup-edit-user-info'"
                  :class="{
                    _active: activeTab === 'cabinet-users-popup-edit-user-info',
                  }"
                >
                  Личные данные
                </button>
                <button
                  type="submit"
                  class="tabs__title _tabs-item"
                  @click="activeTab = 'cabinet-users-popup-edit-user-password'"
                  :class="{
                    _active:
                      activeTab === 'cabinet-users-popup-edit-user-password',
                  }"
                >
                  Сменить пароль
                </button>
              </nav>
              <div class="tabs__content">
                <keep-alive>
                  <component :is="activeTab" />
                </keep-alive>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CabinetUsersPopupEditUserPassword from "./CabinetUsersPopupEditUserPassword.vue";
import CabinetUsersPopupEditUserInfo from "./CabinetUsersPopupEditUserInfo.vue";
import { createNamespacedHelpers } from "vuex";

const { mapMutations } = createNamespacedHelpers("users/currentUser");

export default {
  name: "cabinet-users-popup-edit-user-data",
  components: {
    CabinetUsersPopupEditUserPassword,
    CabinetUsersPopupEditUserInfo,
  },
  data() {
    return {
      activeTab: "cabinet-users-popup-edit-user-info",
    };
  },
  methods: {
    ...mapMutations(["setIsModalActive", "clearCurrentUser"]),
  },
};
</script>