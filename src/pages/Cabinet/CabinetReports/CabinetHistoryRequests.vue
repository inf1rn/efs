<template>
  <div class="tabs__body _tabs-block _active">
    <form
      class="tabs__body-form form reports_tabs-form reports_tabs-form--three"
    >
      <div class="reports_tabs-form-wrap reports-wrap">
        <div class="reports-wrap__top">
          <div class="reports_tabs-form__row row-name_report">
            <div class="reports_tabs-form__row row-bottom">
              <div class="reports_tabs-form__line form__item">
                <div class="reports__dates">
                  <label for="reportsDateFrom" class="form__label">Дата</label>
                  <div class="reports__dates-wrap">
                    <div class="reports__dates-inputs">
                      <input
                        type="date"
                        name="reportsDateFrom"
                        class="form__input-edit form__input-edit_el_date-from"
                        id="dateFrom"
                        :value="filters.dateAt"
                        @change="
                          (e) => {
                            setFiltersDateAt(e.target.value);
                            fetchReportLogs();
                          }
                        "
                      />
                      <div class="reports__dates-inputs__line"></div>
                      <input
                        type="date"
                        name="reportsDateTo"
                        class="form__input-edit form__input-edit_el_date-to"
                        id="dateTo"
                        :value="filters.dateTo"
                        @change="
                          (e) => {
                            setFiltersDateTo(e.target.value);
                            fetchReportLogs();
                          }
                        "
                      />
                    </div>
                    <a
                      @click="
                        (e) => {
                          clearFilters();
                          fetchReportLogs();
                        }
                      "
                      href="#"
                      class="filter__reset-link reports-search__reset-link"
                      >Сбросить</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reports__row row-table">
          <div class="row-table__top">
            <div class="row-table__found table-found">
              Найдено {{ logs.length }}
            </div>
          </div>
          <table class="table reports__table users__table">
            <tbody>
              <tr class="table__row table__row_head">
                <th class="table__header">Дата</th>
                <th class="table__header">Отчет</th>
                <th class="table__header">Регион</th>
                <th class="table__header">Период</th>
                <th class="table__header"></th>
              </tr>
              <tr class="table__row" v-for="log in logs" :key="log.id">
                <td class="table__cell">
                  {{
                    new Date(log.created_at)
                      .toLocaleString("ru-RU")
                      .slice(0, 10)
                  }}<br />
                  {{
                    new Date(log.created_at)
                      .toLocaleString("ru-RU")
                      .slice(11, 17)
                  }}
                </td>
                <td class="table__cell">
                  {{
                    log.form_id ? getFormByFormId()(log.form_id)?.title : "Все"
                  }}
                </td>
                <td class="table__cell">
                  {{
                    log.region_id ? getRegionByRegionId()(log.region_id)?.title : "Все"
                  }}
                </td>
                <td class="table__cell">
                  {{
                    log.date_start &&
                    new Date(log.date_start)
                      .toLocaleString("ru-RU")
                      .slice(0, 10)
                  }}-
                  {{
                    log.date_end &&
                    new Date(log.date_end).toLocaleString("ru-RU").slice(0, 10)
                  }}
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
const {
  mapState: mapStateHistoryRequest,
  mapActions: mapActionsHistoryRequests,
  mapMutations: mapMutationsHistoryRequest,
} = createNamespacedHelpers("forms/reports/reportHistoryRequests");
const { mapGetters: mapGettersLocation } = createNamespacedHelpers("location");
const { mapGetters: mapGettersReports } =
  createNamespacedHelpers("forms/reports");

export default {
  name: "cabinet-history-requests",
  methods: {
    ...mapActionsHistoryRequests(["fetchReportLogs"]),
    ...mapMutationsHistoryRequest([
      "clearFilters",
      "setFiltersDateAt",
      "setFiltersDateTo",
    ]),
    ...mapGettersLocation(["getRegionByRegionId"]),
    ...mapGettersReports(["getFormByFormId"]),
  },
  computed: {
    ...mapStateHistoryRequest({
      logs: (state) => state.logs,
      filters: (state) => state.filters,
    }),
  },
  created() {
    this.fetchReportLogs();
  },
};
</script>