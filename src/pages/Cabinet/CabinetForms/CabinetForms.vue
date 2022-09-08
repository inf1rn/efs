<template>
  <main class="content content_cabinet">
    <section class="users page__section">
      <div class="users__top">
        <h1 class="section-title">формы</h1>
        <router-link
          v-if="userPermissions.includes('create_forms')"
          to="/cabinet/forms/new-form"
          class="users__add"
          >+ создать форму</router-link
        >
      </div>

      <div class="users__wrapper wrapper-max_width-m">
        <div class="users__row row-search">
          <search-input
            :inputValue="filters.keyword"
            @search="
              ($event) => {
                setKeyword($event);
                fetchForms();
              }
            "
          />
        </div>
        <div class="users__row row-table">
          <div class="row-table__top">
            <div class="row-table__found">Найдено {{ pagination?.total }}</div>
            <div class="row-table__selects table-selects">
              <div class="table-selects__col">
                <input
                  class="form__select_theme_transparent"
                  style="width: 150px; margin-right: 20px"
                  type="date"
                  @change="
                    (e) => {
                      setFiltersDateAt(e.target.value);
                      fetchForms();
                    }
                  "
                  :value="filters.dateAt"
                />
              </div>
              <div class="table-selects__col">
                <input
                  class="form__select_theme_transparent"
                  style="width: 150px; margin-right: 20px"
                  type="date"
                  @change="
                    (e) => {
                      setFiltersDateTo(e.target.value);
                      fetchForms();
                    }
                  "
                  :value="filters.dateTo"
                />
              </div>
              <div class="table-selects__col">
                <select
                  class="form__select_theme_transparent"
                  style="width: 150px"
                  @change="
                    (e) => {
                      setFiltersStatusId(e.target.value);
                      fetchForms();
                    }
                  "
                  :value="filters.statusId"
                >
                  <option value="">Выберите статус</option>
                  <option value="1">Закрыта</option>
                  <option value="2">Открыта</option>
                </select>
              </div>
            </div>
          </div>
          <table class="table users__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th class="table__header">Номер</th>
                <th class="table__header">Наименование</th>
                <th class="table__header">Периодичность</th>
                <th class="table__header">Действие</th>
                <th class="table__header">Заполнило</th>
                <th class="table__header">Статус</th>
                <th
                  class="table__header"
                  v-if="userPermissions?.includes('delete_forms')"
                >
                  Удалить
                </th>
                <th
                  class="table__header"
                  v-if="userPermissions?.includes('edit_forms')"
                >
                  Открыть / закрыть
                </th>
                <th class="table__header"></th>
              </tr>
              <tr
                class="table__row"
                v-for="form in forms"
                :key="form.id"
                @click="$router.push(`${formUrl}${form.id}`)"
              >
                <td class="table__cell">{{ form.id }}</td>
                <td class="table__cell">
                  {{ form.title }}
                </td>
                <td class="table__cell">
                  {{ getFrequencyRus(form.frequency) }}
                </td>
                <td class="table__cell">
                  {{ formateDate(form.active_start) }} -
                  {{ formateDate(form.active_end) }}
                </td>
                <td class="table__cell">{{ form.filled_count }}/85</td>
                <td class="table__cell">{{ form.status.title }}</td>
                <td
                  class="table__cell"
                  v-if="userPermissions?.includes('delete_forms')"
                >
                  <button
                    @click.stop="deleteHandler(form.id)"
                    class="button button_theme_red button_border_small"
                  >
                    Удалить
                  </button>
                </td>
                <td
                  class="table__cell"
                  v-if="userPermissions?.includes('delete_forms')"
                >
                  <button
                    @click.stop="toggleStatusForm(form)"
                    class="button button_theme_green button_border_small"
                  >
                    {{ form.status.id === 1 ?  "Открыть" : "Закрыть"}}
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
              {{ firstItemNumber }}-{{ lastItemNumber }} из
              {{ pagination?.total }}
            </div>
            <div class="table-pagination__bullets">
              <button class="bullets-left _disabled" @click="setPrevPage()">
                <img
                  src="@/assets/images/table-pagination/left.svg"
                  alt="left"
                />
              </button>
              <button class="bullets-right" @click="setNextPage()">
                <img
                  src="@/assets/images/table-pagination/right.svg"
                  alt="right"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { translateMixin } from "@/mixins/translateMixin";
import { dateMixin } from "@/mixins/dateMixin";

const {
  mapActions: mapActionsForms,
  mapState: mapStateForms,
  mapMutations: mapMutationsForms,
} = createNamespacedHelpers("forms/formsAll");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");
//TODO: mixin for pagination
export default {
  name: "cabinet-forms",
  title: "Формы",
  mixins: [translateMixin, dateMixin],
  methods: {
    ...mapActionsForms([
      "fetchForms",
      "deleteForm",
      "setNextPage",
      "setPrevPage",
      "toggleStatusForm"
    ]),
    ...mapMutationsForms([
      "setKeyword",
      "setRemovableFormId",
      "setFiltersStatusId",
      "setFiltersDateAt",
      "setFiltersDateTo",
    ]),
    deleteHandler(formId) {
      this.setRemovableFormId(formId);
      this.deleteForm();
    },
  },
  computed: {
    ...mapStateForms({
      forms: (state) => state.forms,
      filters: (state) => state.filters,
      pagination: (state) => state.pagination,
    }),
    ...mapStateAccount({
      userRole: (state) => state.userData.roles[0],
      userPermissions: (state) => state.userData.permissions,
    }),
    formUrl() {
      console.log(this.userRole);
      const fillFormRoles = ["regional_monitoring"];

      if (fillFormRoles.includes(this.userRole.name)) {
        return "/cabinet/forms/fill-form-";
      }
      return "/cabinet/forms/form-";
    },
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
    this.fetchForms();
  },
};
</script>