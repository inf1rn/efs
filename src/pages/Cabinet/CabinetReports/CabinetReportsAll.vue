<template>
  <div class="tabs__body _tabs-block _active">
    <form class="tabs__body-form form reports_tabs-form reports_tabs-form--one">
      <div class="reports_tabs-form-wrap reports-wrap">
        <div class="reports-wrap__top">
          <div class="reports_tabs-form__row row-name_report">
            <div class="reports_tabs-form__line form__item">
              <label for="reportsTabsSecondName" class="form__label"
                >Название отчета</label
              >
              <select
                :value="filters.formId"
                @change="(e) => setFiltersFormId(e.target.value)"
                class="
                  form__select
                  form__select_theme_white
                  form__select-reports_width_full
                "
                id="reportsTabsSecondName"
              >
                <option value="" hidden>Выберите форму</option>
                <option v-for="form in forms" :key="form.id" :value="form.id">
                  {{ form.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="reports_tabs-form__row row-bottom">
            <div class="reports_tabs-form__line form__item">
              <label for="reportsRegion" class="form__label">Регион</label>
              <select
                @change="(e) => setFiltersRegionId(e.target.value)"
                class="form__select form__select_theme_white"
              >
                <option value="" hidden>Выберите регион</option>
                <option
                  v-for="region in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.title }}
                </option>
              </select>
            </div>
            <div class="reports_tabs-form__line form__item">
              <div class="reports__dates">
                <label for="reportsDateFrom" class="form__label">Дата</label>
                <div class="reports__dates-wrap">
                  <div class="reports__dates-inputs">
                    <input
                      :value="filters.dateAt"
                      @change="(e) => setFiltersDateAt(e.target.value)"
                      type="date"
                      name="reportsDateFrom"
                      class="form__input-edit form__input-edit_el_date-from"
                      id="dateFrom"
                    />
                    <div class="reports__dates-inputs__line"></div>
                    <input
                      @change="(e) => setFiltersDateTo(e.target.value)"
                      :value="filters.dateTo"
                      type="date"
                      name="reportsDateTo"
                      class="form__input-edit form__input-edit_el_date-to"
                      id="dateTo"
                    />
                  </div>
                  <a
                    @click="clearFilters()"
                    href="#"
                    class="filter__reset-link reports-search__reset-link"
                    >Сбросить</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="reports__row row-table" v-if="filters.formId">
          <div class="table_header">
            <ul>
              <li>
                <a
                  @click="createReportTemplateHandler()"
                  href="#"
                  class="table_header-icon_star"
                  >Добавить в шаблон</a
                >
              </li>
              <li>
                <a
                  @click.prevent="
                    downloadItem({ url: csvUrl, label: 'reports.csv' })
                  "
                  href="#"
                  class="table_header-icon_download"
                  >Скачать в формате csv</a
                >
              </li>
              <li>
                <a
                  @click.prevent="
                    downloadItem({ url: csvUrl, label: 'reports.xlsx' })
                  "
                  href="#"
                  class="table_header-icon_download"
                  >Скачать в формате xls</a
                >
              </li>
            </ul>
          </div>
          <div class="row-table__top">
            <div class="row-table__found table-found">
              Найдено {{ reports.length }}
            </div>
          </div>
          <table class="table reports__table users__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th
                  class="table__header"
                  v-for="field of fields"
                  :key="field[0].id"
                >
                  {{ field[0].title }}
                </th>
                <th class="table__header"></th>
              </tr>
              <tr class="table__row" v-for="report in reports" :key="report.id">
                <td
                  class="table__cell"
                  v-for="fieldResult in report"
                  :key="fieldResult.id"
                >
                  {{ fieldResult.value }}
                </td>
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
    </form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { loadFileMixin } from "@/mixins/loadFileMixin";

const { mapState: mapStateReportsAll, mapActions: mapActionsReportsAll } =
  createNamespacedHelpers("forms/reports/reportsAll");
const { mapState: mapStateLocation, mapGetters: mapGettersLocation } =
  createNamespacedHelpers("location");
const { mapState: mapStateReports } = createNamespacedHelpers("forms/reports");

export default {
  name: "cabinet-reports-all",
  computed: {
    ...mapStateReportsAll({
      reports: (state) => state.reports,
      filters: (state) => state.filters,
      fields: (state) => state.fields,
      csvUrl: (state) => state.csvUrl,
      xlsxUrl: (state) => state.xlsxUrl,
    }),
    ...mapStateReports({
      forms: (state) => state.forms,
    }),
    ...mapStateLocation({
      regions: (state) => state.regions,
    }),
  },
  mixins: [loadFileMixin],
  methods: {
    ...mapActionsReportsAll([
      "fetchReports",
      "setFiltersFormId",
      "setFiltersDateAt",
      "setFiltersDateTo",
      "setFiltersRegionId",
      "clearFilters",
      "createReportTemplate",
    ]),
    ...mapGettersLocation(["getRegionByRegionId"]),
    createReportTemplateHandler() {
      const { dateAt, regionId, dateTo } = this.filters;
      if (!(dateAt | regionId | dateTo)) {
        alert("Необходимо заполнить все поля");
        return;
      }

      this.createReportTemplate();
    },
  },
};
</script>
