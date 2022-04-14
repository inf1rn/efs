<template>
  <header class="header">
    <div class="header__inner header__inner_page_cabinet">
      <div class="header__column header__column_direct_row">
        <router-link to="/" class="logo logo_page_cabinet"></router-link>
        <router-link
          to="/cabinet/news"
          active-class="active"
          class="header-link header__add_news-link"
          v-if="userData?.permissions.includes('publish_articles')"
          >Новости</router-link
        >
        <router-link to="/" class="header-link header__site-link"
          >Перейти на сайт</router-link
        >
        <router-link
          to="/cabinet/logging"
          active-class="active"
          class="header-link header__log-link"
          v-if="userData?.permissions.includes('view_logs')"
          >Логирование</router-link
        >
        <a
          @click="toggleTechnicalSupportPopup"
          href="#"
          class="header-link header__log-link"
          v-if="!roles?.includes('superadmin')"
          >Техническая поддержка</a
        >
      </div>
      <div class="header__column header__column_direct_row-end">
        <router-link to="/cabinet" class="header__user-link">
          <img
            :src="imageSrc"
            class="header__avatar"
            alt="Аватар пользователя"
            v-if="imageSrc"
          />
          <span class="header__username">{{ initials }}</span>
        </router-link>
        <div class="header__controls">
          <router-link
            to="/cabinet/notifications"
            class="header__control header__control_type_notification"
            title="Уведомления"
          >
            <span v-if="notOpenedMessagesCount" class="notification-count">{{
              notOpenedMessagesCount
            }}</span>
          </router-link>
          <a
            @click="hadnlerLogout"
            href="#"
            class="header__control header__control_type_logout"
            title="Выйти"
          ></a>
        </div>
      </div>
    </div>
    <technical-support-popup v-if="isOpenedTechnicalSupport" />
  </header>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import TechnicalSupportPopup from "@/components/TechnicalSupportPopup";

export default {
  name: "CabinetHeader",
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    ...mapMutations({
      setIsOpened: "technicalSupport/setIsOpened",
    }),
    ...mapGetters({
      getNotOpenedMessagesCount: "messages/messagesAll/getNotOpenedMessagesCount"
    }),
    hadnlerLogout() {
      this.logout();
      this.$router.push("/");
    },
    toggleTechnicalSupportPopup() {
      this.setIsOpened(true);
    },
  },
  computed: {
    ...mapState({
      isOpenedTechnicalSupport: (state) => state.technicalSupport.isOpened,
      userData: (state) => state.account.userData,
    }),
    initials: function () {
      if (!this.userData) {
        return "";
      }

      const { first_name, last_name, second_name } = this.userData;
      return (
        second_name +
        " " +
        first_name?.slice(0, 1) +
        ". " +
        (last_name ? last_name.slice(0, 1) + "." : "")
      );
    },
    imageSrc: function () {
      return this.userData?.image;
    },
    userId: function () {
      return this.userData?.id;
    },
    notOpenedMessagesCount() {
      return this.getNotOpenedMessagesCount()
    },
    roles() {
      return this.userData?.roles.map(role => role.name)
    }
  },
  components: {
    TechnicalSupportPopup,
  },
};
</script>