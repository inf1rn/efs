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
              :value="filters.isPublished"
              @change="
                (e) => {
                  setFormStatFiltersIsPublished(e.target.value);
                  fetchFormStatResults();
                }
              "
            >
              <option value="">Все</option>
              <option value="1">Согласована</option>
              <option value="0">Не согласована</option>
              <option value="draft">Черновик</option>
            </select>
          </div>
          <div class="form__item">
            <label for="form-detailDate" class="form__label">Дата</label>
            <input
              @change="
                (e) => {
                  setFormStatFiltersCreatedAt(e.target.value);
                  fetchFormStatResults();
                }
              "
              :value="filters.createdAt"
              type="date"
              name="form-detailDate"
              class="form__input-edit"
              id="detailDate"
            />
          </div>
          <div class="form__item">
            <a
              @click="
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
                {{
                  new Date(statResult.created_at).toLocaleDateString("ru-RU")
                }}
              </td>
              <td class="table__cell">да</td>
              <td class="table__cell">заполнена</td>
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
      "setFormStatFiltersCreatedAt",
      "setFormStatFiltersIsPublished",
      "clearFormStatFilters",
    ]),
  },
  computed: {
    ...mapState({
      statResults: (state) => state.statResults,
      filters: (state) => state.formStatFilters,
    }),
  },
  created() {
    this.setFormId(this.$route.params.formId);
    this.fetchFormStatResults();
  },
};
</script>