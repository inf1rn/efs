<template>
  <div class="tabs__body _tabs-block">
    <div class="admin_mailings__row row-inputs">
      <div class="admin_mailings__inp input-date">
        <label for="adminSubjectDate" class="form__label">Датa от</label>
        <input
          :value="filters.dateAt"
          @change="
            (e) => {
              setFiltersDateAt(e.target.value);
              fetchNotifications();
            }
          "
          type="date"
          name="date-from"
          class="form__input-edit form__input-edit_el_date-from"
          id="date-from"
        />
      </div>
      <div class="admin_mailings__inp input-date">
        <label for="adminSubjectDate" class="form__label">Датa по</label>
        <input
          :value="filters.dateTo"
          @change="
            (e) => {
              setFiltersDateTo(e.target.value);
              fetchNotifications();
            }
          "
          type="date"
          name="date-from"
          class="form__input-edit form__input-edit_el_date-from"
          id="date-from"
        />
      </div>
      <div class="admin_mailings__inp">
        <label for="adminSubjectDate" class="form__label">Роль</label>
        <select
          :value="filters.roleId"
          @change="(e) => setFiltersRoleId(e.target.value)"
          class="form__select form__select_theme_white"
        >
          <option value="" hidden>Выберите роль</option>
          <option v-for="role in roles" :value="role.id" :key="role.id">
            {{ role.title }}
          </option>
        </select>
      </div>
      <div class="admin_mailings__inp">
        <label for="adminSubjectDate" class="form__label">Регион</label>
        <select
          :value="filters.regionId"
          @change="(e) => setFiltersRegionId(e.target.value)"
          class="form__select form__select_theme_white"
        >
          <option value="">Вcе</option>
          <option v-for="region in regions" :value="region.id" :key="region.id">
            {{ region.title }}
          </option>
        </select>
      </div>
      <div class="admin_mailings__inp">
        <div class="admin_mailings__link">
          <a
            @click="clearFilters()"
            href="#"
            class="filter__reset-link reports-search__reset-link"
            >Сбросить</a
          >
        </div>
      </div>
    </div>
    <div class="admin_mailings__row row-table">
      <div class="row-table__top">
        <div class="row-table__found table-found">
          Найдено {{ pagination?.total }}
        </div>
      </div>
      <table class="table listeners__table users__table">
        <tbody>
          <tr class="table__row table__row_head">
            <th class="table__header">№ уведомления</th>
            <th class="table__header">Уведомление</th>
            <th class="table__header">Дата отправки</th>
            <th class="table__header">Статус</th>
            <th class="table__header">Роль</th>
            <th class="table__header">Регион</th>
            <th class="table__header">№ связанной рассылки</th>
            <th class="table__header">Удалить</th>
            <th class="table__header"></th>
          </tr>
          <tr
            @click="
              $router.push(
                `/cabinet/notifications-and-mailings/notifications/${notification.id}`
              )
            "
            class="table__row"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <td class="table__cell">{{ notification.id }}</td>
            <td class="table__cell">
              {{ notification.title }}
            </td>
            <td class="table__cell">
              {{
                new Date(notification.send_at)
                  .toLocaleString("ru-RU")
                  .slice(0, 10)
              }}
            </td>
            <td class="table__cell">{{ notification.status?.title }}</td>
            <td class="table__cell">
              {{ notification.role?.title || "Все роли" }}
            </td>
            <td class="table__cell">
              {{ notification.region?.title || "Все" }}
            </td>
            <td class="table__cell">{{ notification.linked_mailing_id }}</td>
            <td class="table__cell">
              <button
                @click.stop="deleteHandler(notification.id)"
                class="button button_theme_red button_border_small"
              >
                Удалить
              </button>
            </td>
            <td class="table__cell">
              <button class="table__cell-users_row-more">
                <img src="@/assets/images/more_dots.svg" alt="more" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-pagination">
        <div class="table-pagination__count">
          {{ firstItemNumber }}-{{ lastItemNumber }} из {{ pagination?.total }}
        </div>
        <div class="table-pagination__bullets">
          <button class="bullets-left _disabled" @click="setPrevPage()">
            <img src="@/assets/images/table-pagination/left.svg" alt="left" />
          </button>
          <button class="bullets-right" @click="setNextPage()">
            <img src="@/assets/images/table-pagination/right.svg" alt="right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateNotifications,
  mapActions: mapActionsNotifications,
  mapMutations: mapMutationsNotifications,
} = createNamespacedHelpers("notificationsAndMailings/notifications");
const { mapState: mapStateRoles } = createNamespacedHelpers("account");
const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "cabinet-notifications-admin",
  title: "Уведомления",
  computed: {
    ...mapStateNotifications({
      notifications: (state) => state.notifications,
      filters: (state) => state.filters,
      pagination: (state) => state.pagination,
    }),
    ...mapStateRoles({
      roles: (state) => state.roles,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
    firstItemNumber() {
      if (!this.pagination) {
        return;
      }
      const { current_page, per_page } = this.pagination;
      return (current_page - 1) * per_page + 1;
    },
    lastItemNumber() {
      if (!this.pagination) {
        return;
      }
      const { current_page, count } = this.pagination;
      return this.firstItemNumber + count - 1;
    },
  },
  methods: {
    ...mapActionsNotifications([
      "fetchNotifications",
      "setFiltersRoleId",
      "setFiltersRegionId",
      "clearFilters",
      "setPrevPage",
      "setNextPage",
      "deleteNotification",
    ]),
    ...mapMutationsNotifications([
      "setRemovableNotificationId",
      "setFiltersDateAt",
      "setFiltersDateTo",
    ]),
    deleteHandler(id) {
      this.setRemovableNotificationId(id);
      this.deleteNotification(id);
    },
  },
  created() {
    this.fetchNotifications();
  },
};
</script>