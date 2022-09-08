<template>
  <div class="tabs__body">
    <div class="admin-log__body width_l">
      <form class="form admin-log__search form-width-m mb-50">
        <input
          type="text"
          name="search"
          class="
            form__input-edit
            form__input-edit_type_search
            form__input-edit_width_full
          "
          id="search"
        />
      </form>
      <table class="table admin-log__table-orgs">
        <tr class="table__row table__row_head">
          <th class="table__header">Дата</th>
          <th class="table__header">Пользователь</th>
          <th class="table__header">Роль</th>
          <th class="table__header">Действие</th>
          <th class="table__header"></th>
        </tr>
        <tr class="table__row" v-for="loginLog in loginLogs" :key="loginLog.id">
          <td class="table__cell">
            {{ formateDate(loginLog.user.last_login, true) }}
          </td>
          <td class="table__cell">
            {{ loginLog.user.second_name }} {{ loginLog.user.first_name }}
            {{ loginLog.user.last_name }}
          </td>
          <td class="table__cell">{{ loginLog.user.roles[0]?.title }}</td>
          <td class="table__cell">5678</td>
          <td class="table__cell">
            <div class="table__cell-users_row-more">
              <img src="@/assets/images/more_dots.svg" alt="more" />
            </div>
          </td>
        </tr>
      </table>
      <div class="table-pagination">
        <div class="table-pagination__count">
          {{ firstItemNumber }}-{{ lastItemNumber }} из {{ pagination?.total }}
        </div>
        <div class="table-pagination__bullets">
          <button @click="setPrevPage()" class="bullets-left _disabled">
            <img src="@/assets/images/table-pagination/left.svg" alt="left" />
          </button>
          <button @click="setNextPage()" class="bullets-right">
            <img src="@/assets/images/table-pagination/right.svg" alt="right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers(
  "logging/loggingLogins"
);

export default {
  name: "cabinet-logging-logins",
  methods: {
    ...mapActions(["fetchLoginLogs", "setPrevPage", "setNextPage"]),
  },
  computed: {
    ...mapState({
      loginLogs: (state) => state.loginLogs,
      pagination: (state) => state.pagination,
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
  created() {
    this.fetchLoginLogs();
  },
};
</script>