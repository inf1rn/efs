<template>
  <div class="tabs__body _tabs-block _active">
    <div class="form-detail-form-wrap">
      <div class="form-detail-form__row row-inputs row-d-flex">
        <div class="form-detail-form__line line-d">
          <div class="form__item">
            <label for="form-detailStatus" class="form__label">Статус</label>
            <select
              type="text"
              class="form__select form__select_theme_white"
              id="form-detailStatus"
              placeholder="Введите статус"
              :value="filters.statusId"
              @change="
                (e) => {
                  setFiltersStatusId(e.target.value);
                  fetchFormStatResults();
                }
              "
            >
              <option value="">Все</option>
              <option value="1">Закрыта</option>
              <option value="2">Открыта</option>
            </select>
          </div>
          <div class="form__item">
            <label for="form-detailDate" class="form__label">Дата от</label>
            <input
              @change="
                (e) => {
                  setFormStatFiltersDateAt(e.target.value);
                  fetchFormStatResults();
                }
              "
              :value="filters.dateAt"
              type="date"
              name="form-detailDate"
              class="form__input-edit"
              id="detailDate"
            />
          </div>
          <div class="form__item">
            <label for="form-detailDate" class="form__label">Дата по</label>
            <input
              @change="
                (e) => {
                  setFormStatFiltersDateTo(e.target.value);
                  fetchFormStatResults();
                }
              "
              :value="filters.dateTo"
              type="date"
              name="form-detailDate"
              class="form__input-edit"
              id="detailDate"
            />
          </div>
          <div class="form__item">
            <a
              @click.prevent="
                (e) => {
                  clearFormStatFilters();
                  fetchFormStatResults();
                }
              "
              href="#"
              class="filter__reset-link"
              >сбросить</a
            >
          </div>
        </div>
      </div>
      <div class="form-detail-form__row users__table row-table">
        <div class="row-table__top">
          <div class="row-table__found">Найдено {{ statResults.length }}</div>
        </div>
        <table class="table form-detail-form__table">
          <tbody>
            <tr class="table__row table__row_head">
              <th class="table__header">Регион</th>
              <th class="table__header">Населенный пункт</th>
              <th class="table__header">Дата заполнения</th>
              <th class="table__header">Согласование</th>
              <th class="table__header">Статус</th>
              <th class="table__header"></th>
            </tr>
            <tr
              class="table__row"
              :key="statResult.id"
              v-for="statResult in statResults"
            >
              <td class="table__cell">{{ statResult.region.title }}</td>
              <td class="table__cell">
                {{ statResult.created_by.city.title }}
              </td>
              <td class="table__cell">
                {{ formateDate(statResult.created_at) }}
              </td>
              <td class="table__cell">
                {{ statResult.accepted_by ? "заполнена" : "не заполнена" }}
              </td>
              <td class="table__cell">{{ statResult.form.status.title }}</td>
              <td class="table__cell">
                <button class="table__cell-users_row-more">
                  <img src="@/assets/images/more_dots.svg" alt="more" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } =
  createNamespacedHelpers("forms/formDetail");

export default {
  name: "cabinet-form-detail-stat",
  methods: {
    ...mapActions(["fetchFormStatResults"]),
    ...mapMutations([
      "setFormId",
      "setFormStatFiltersDateAt",
      "setFormStatFiltersDateTo",
      "setFormStatFiltersIsPublished",
      "clearFormStatFilters",
      "setFiltersStatusId",
    ]),
  },
  computed: {
    ...mapState({
      statResults: (state) => state.statResults,
      filters: (state) => state.formStatFilters,
      formEditableData: (state) => state.formEditableData,
    }),
  },
  created() {
    this.setFormId(this.$route.params.formId);
    this.fetchFormStatResults();
  },
};
</script>