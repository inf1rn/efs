<template>
  <aside
    class="sidebar"
    :class="{ sidebar_opened: isSidebarActive }"
    @mouseover="
      {
        fromSeparatly = false;
      }
    "
    @mouseleave="fromSeparatly = false"
  >
    <button class="sidebar__toggle" @click="toggleSidebar"></button>
    <nav class="sidebar__menu">
      <router-link
        active-class="sidebar__menu-item_active"
        :to="{ name: 'cabinet-listeners-home' }"
        class="sidebar__menu-item"
        v-if="permissions?.includes('view_listeners')"
      >
        <i
          class="sidebar__menu-item-icon sidebar__menu-item_icon_listeners"
        ></i>
        <span class="sidebar__menu-item-text">Слушатели</span>
      </router-link>
      <router-link
        :to="{
          path:
            roles[0] === 'regional_monitoring'
              ? `/cabinet/subjects/${regionId}`
              : '/cabinet/subjects',
        }"
        active-class="sidebar__menu-item_active"
        class="sidebar__menu-item"
        v-if="permissions?.includes('view_organizations')"
      >
        <i
          class="sidebar__menu-item-icon sidebar__menu-item_icon_organizations"
        ></i>
        <span class="sidebar__menu-item-text">Субъекты</span>
      </router-link>
      <router-link
        :to="{ name: formsRouteName }"
        active-class="sidebar__menu-item_active"
        class="sidebar__menu-item"
        v-if="permissions?.includes('view_forms')"
      >
        <i class="sidebar__menu-item-icon sidebar__menu-item_icon_forms"></i>
        <span class="sidebar__menu-item-text">Формы</span>
      </router-link>
      <router-link
        :class="{
          'sidebar__menu-item_active':
            $route.path.includes('/cabinet/reports') ||
            (roles?.includes('minister') &&
              $route.path.includes('/cabinet/listeners')),
        }"
        v-if="permissions?.includes('view_reports')"
        @mouseover="
          isVisibleSeparatly =
            (roles?.includes('minister') ||
              roles?.includes('superadmin') ||
              (permissions?.includes('view_reports') &&
                permissions?.includes('view_reports_listeners'))) &&
            (fromSeparatly ? false : true)
        "
        to="/cabinet/reports"
        class="sidebar__menu-item"
      >
        <i class="sidebar__menu-item-icon sidebar__menu-item_icon_reports"></i>
        <span class="sidebar__menu-item-text">Отчеты</span>
      </router-link>
      <div
        style="position: relative"
        v-if="isVisibleSeparatly"
        @mouseleave="
          (e) => {
            isVisibleSeparatly = false;
            fromSeparatly = true;
          }
        "
      >
        <div class="sidebar__menu-items-container">
          <div class="sidebar__menu-item-container">
            <router-link
              to="/cabinet/reports"
              class="sidebar__menu-item sidebar__menu-item_separatly"
            >
              <i
                class="sidebar__menu-item-icon sidebar__menu-item_icon_reports"
              ></i>
              <span
                class="
                  sidebar__menu-item-text sidebar__menu-item-text_separatly
                "
                >Отчеты</span
              >
            </router-link>
          </div>
          <div class="sidebar__menu-item-container">
            <router-link
              to="/cabinet/listeners/stat"
              class="sidebar__menu-item sidebar__menu-item_separatly"
            >
              <i
                class="
                  sidebar__menu-item-icon sidebar__menu-item_icon_listeners
                "
              ></i>
              <span
                class="
                  sidebar__menu-item-text sidebar__menu-item-text_separatly
                "
                >Отчеты<br />по слушателям</span
              >
            </router-link>
          </div>
        </div>
      </div>
      <router-link
        to="/cabinet/map"
        class="sidebar__menu-item"
        active-class="sidebar__menu-item_active"
        v-if="permissions?.includes('view_interactive_map')"
      >
        <i class="sidebar__menu-item-icon sidebar__menu-item_icon_map"></i>
        <span class="sidebar__menu-item-text">Интерактивная карта</span>
      </router-link>
      <router-link
        :to="{ name: 'cabinet-users-home' }"
        active-class="sidebar__menu-item_active"
        class="sidebar__menu-item"
        v-if="permissions?.includes('view_users')"
      >
        <i class="sidebar__menu-item-icon sidebar__menu-item_icon_users"></i>
        <span class="sidebar__menu-item-text">Пользователи</span>
      </router-link>
      <router-link
        :to="{ name: 'notifications-and-mailings-home' }"
        class="sidebar__menu-item"
        active-class="sidebar__menu-item_active"
        v-if="permissions?.includes('view_mailings')"
      >
        <i class="sidebar__menu-item-icon sidebar__menu-item_icon_mailings"></i>
        <span class="sidebar__menu-item-text">Уведомления и рассылки</span>
      </router-link>
    </nav>
  </aside>
</template>
<script>
import { createNamespacedHelpers, mapGetters, mapState } from "vuex";

export default {
  name: "CabinetSidebar",
  data() {
    return {
      isSidebarActive: false,
      isVisibleSeparatly: false,
      fromSeparatly: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    },
  },
  computed: {
    ...mapState({
      permissions: (state) => state.account.userData?.permissions,
      regionId: (state) => state.account.userData?.region.id,
    }),
    ...mapGetters({ getUserRolesNames: "account/getUserRolesNames" }),
    roles() {
      console.log(this.getUserRolesNames);
      return this.getUserRolesNames;
    },
    formsRouteName() {
      console.log(this.roles);

      if (!this.roles) {
        return;
      }

      switch (this.roles[0]) {
        case "regional_minister": {
          console.log(111);
          return "cabinet-forms-approval";
        }
        default: {
          return "cabinet-forms";
        }
      }
    },
  },
};
</script>