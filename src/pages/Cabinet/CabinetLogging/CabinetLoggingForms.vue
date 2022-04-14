<template>
  <div class="tabs__body">
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
        <th class="table__header">Действие</th>
        <th class="table__header">Пользователь</th>
        <th class="table__header">Роль</th>
        <th class="table__header">№ формы</th>
        <th class="table__header">Название формы</th>
      </tr>
      <tr class="table__row" v-for="formLog in formLogs" :key="formLog.id">
        <td class="table__cell">
          {{new Date(formLog.created_at).toLocaleString("ru-RU").slice(0, 10)}} {{new Date(formLog.created_at).toLocaleString("ru-RU").slice(11, 17)}}
        </td>
        <td class="table__cell">{{ formLog.event }} {{ formLog.entity }}</td>
        <td class="table__cell">
          {{ formLog.user.second_name }} {{ formLog.user.first_name }}
          {{ formLog.user.last_name }}
        </td>
        <td class="table__cell">{{ formLog.user.roles[0]?.title }}</td>
        <td class="table__cell">{{ formLog.new_values.form_id }}</td>
        <td class="table__cell">
          Сведения о организации дополнительного профессионального образования
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
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions: mapActionsLoggingForms, mapState: mapStateLoggingForms } =
  createNamespacedHelpers("logging/loggingForms");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");
export default {
  name: "cabinet-logging-forms",
  methods: {
    ...mapActionsLoggingForms(["fetchFormLogs", "setNextPage", "setPrevPage"]),
  },
  computed: {
    ...mapStateAccount({
      userData: (state) => state.userData,
    }),
    ...mapStateLoggingForms({
      formLogs: (state) => state.formLogs,
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
    this.fetchFormLogs();
  },
};
</script>