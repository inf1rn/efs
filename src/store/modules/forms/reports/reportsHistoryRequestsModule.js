import { formsAPI } from "@/API/forms"

export const reportHistoryRequestsModule = {
    state() {
        return {
            logs: [],
            filters: {
                dateAt: "",
                dateTo: ""
            }
        }

    },
    mutations: {
        setLogs(state, logs) {
            state.logs = logs
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
        clearFilters(state) {
            state.filters = {
                dateAt: "",
                dateTo: ""
            }
        }
    },
    actions: {
        async fetchReportLogs({ state, commit }) {
            const { data: { data: { data: logs } } } = await formsAPI.fetchReportLogs({
                dateTo: state.filters.dateTo,
                dateAt: state.filters.dateAt
            })
            commit("setLogs", logs)
        }
    },
    namespaced: true
}