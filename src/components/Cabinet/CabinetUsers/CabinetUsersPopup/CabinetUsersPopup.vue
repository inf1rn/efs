<template>
  <keep-alive>
    <component :is="activeTab" @set-edit-component="activeTab = 'cabinet-users-popup-edit-user-data'" />
  </keep-alive>
</template>
<script>
import CabinetUsersPopupEditUserData from "./CabinetUsersPopupEditUserData.vue";
import CabinetUsersPopupUserInfo from "./CabinetUsersPopupUserInfo.vue";

export default {
  name: "cabinet-users-popup",
  components: {
    CabinetUsersPopupEditUserData,
    CabinetUsersPopupUserInfo
  },
  data() {
    return {
      activeTab: "cabinet-users-popup-user-info",
    };
  },
};
</script>