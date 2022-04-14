<template>
  <div class="tabs__body">
    <div class="admin-log__body">
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
          <th class="table__header">Название формы</th>
          <td class="table__cell">
            <div class="table__cell-users_row-more">
              <img src="@/assets/images/more_dots.svg" alt="more" />
            </div>
          </td>
        </tr>
        <tr
          class="table__row"
          v-for="statisticsLog in statisticsLogs"
          :key="statisticsLog.id"
        >
          <td class="table__cell">
            {{new Date(statisticsLog.created_at).toLocaleString("ru-RU").slice(0, 10)}} <br />
            {{new Date(statisticsLog.created_at).toLocaleString("ru-RU").slice(11, 17)}}
          </td>
          <td class="table__cell">
            {{ statisticsLog.user.second_name }}
            {{ statisticsLog.user.first_name }}
            {{ statisticsLog.user.last_name }}
          </td>
          <td class="table__cell">{{statisticsLog.user.roles[0]?.title}}</td>
          <td class="table__cell">
            {{ statisticsLog.event }} {{ statisticsLog.entity }}
          </td>
          <td class="table__cell">
            Редактирование данные в поле программы ДПО у такого-то субъекта
          </td>
          <td class="table__cell">
            <div class="table__cell-users_row-more">
              <img src="@/assets/images/more_dots.svg" alt="more" />
            </div>
          </td>
        </tr>
      </table>
      <div class="table-pagination">
        <div class="table-pagination__count">{{firstItemNumber}}-{{lastItemNumber}} из {{pagination?.total}}</div>
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
  "logging/loggingStatistics"
);
export default {
  name: "cabinet-logging-statistics",
  methods: {
    ...mapActions(["fetchStatisticsLogs", "setNextPage", "setPrevPage"]),
  },
  computed: {
    ...mapState({
      statisticsLogs: (state) => state.statisticsLogs,
      pagination: state => state.pagination
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
    this.fetchStatisticsLogs();
  },
};
</script>