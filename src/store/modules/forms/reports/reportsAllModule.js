import { reportsAPI } from "@/API/reports"
import { formsAPI } from "@/API/forms"

export const reportsAllModule = {
    state() {
        return {
            reports: [],
            filters: {
                formId: "",
                regionId: "",
                dateAt: "",
                dateTo: ""
            },
            fields: [],
            xlsxUrl: null,
            csvUrl: null
        }
    },
    mutations: {
        setReports(state, reports) {
            state.reports = reports
        },
        setFiltersFormId(state, formId) {
            state.filters = {
                ...state.filters,
                formId
            }
        },
        setFiltersDateAt(state, dateAt) {
            state.filters = {
                ...state.filters,
                dateAt
            }
        },
        setFiltersDateTo(state, dateTo) {
            state.filters = {
                ...state.filters,
                dateTo
            }
        },
        setFiltersRegionId(state, regionId) {
            state.filters = {
                ...state.filters,
                regionId
            }
        },
        clearFilters(state) {
            state.filters = {
                formId: "",
                regionId: "",
                dateAt: "",
                dateTo: ""
            }
        },
        setFields(state, fields) {
            state.fields = fields
        },
        setXLSXUrl(state, xlsxUrl) {
            state.xlsxUrl = xlsxUrl
        },
        setCSVUrl(state, csvUrl) {
            state.csvUrl = csvUrl
        }
    },
    actions: {
        async fetchReports({ state, commit, rootState }) {
            if (rootState.account.userData?.roles[0].name === "regional_minister") {
                commit("setFiltersRegionId", rootState.account.userData.region.id)
            }

            const { formId, regionId, dateAt, dateTo } = state.filters
            const { data: { data: { results: reports, fields } } } = await formsAPI.fetchFormResults(formId, { regionId, dateAt, dateTo })
            const { data: { data: { url: xlsxUrl } } } = await formsAPI.fetchFormResultsExport(formId, { type: "xlsx", regionId, dateAt, dateTo })
            const { data: { data: { url: csvUrl } } } = await formsAPI.fetchFormResultsExport(formId, { type: "csv", regionId, dateAt, dateTo })

            commit("setCSVUrl", csvUrl)
            commit("setXLSXUrl", xlsxUrl)

            commit("setReports", reports)
            commit("setFields", fields)
        },
        setFiltersFormId({ commit, dispatch }, formId) {
            commit("setFiltersFormId", formId)
            dispatch("fetchReports")
        },
        setFiltersRegionId({ commit, dispatch }, regionId) {
            commit("setFiltersRegionId", regionId)
            dispatch("fetchReports")
        },
        setFiltersDateAt({ commit, dispatch }, dateAt) {
            commit("setFiltersDateAt", dateAt)
            dispatch("fetchReports")
        },
        setFiltersDateTo({ commit, dispatch }, dateTo) {
            commit("setFiltersDateTo", dateTo)
            dispatch("fetchReports")
        },
        clearFilters({ commit, dispatch }) {
            commit("clearFilters")
            commit("setReports", [])
        },
        async createReportTemplate({ state }) {
            await reportsAPI.createReportTemplate(state.filters)
            alert("Шаблон добавлен")
        }
    },
    namespaced: true
}