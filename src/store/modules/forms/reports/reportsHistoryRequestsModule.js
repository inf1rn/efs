import { formsAPI } from "@/API/forms"

export const reportHistoryRequestsModule = {
    state() {
        return {
            logs: [],
            filters: {
                dateAt: "",
                dateTo: ""
            },
            pagination: null,
            currentPage: 1,
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
        },
        setPagination(state, pagination) {
            state.pagination = pagination
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setPrevPage(state) {
            state.currentPage -= 1
        },

    },
    actions: {
        async fetchReportLogs({ state, commit }) {
            const { data: { data: { data: logs, pagination } } } = await formsAPI.fetchReportLogs({
                dateTo: state.filters.dateTo,
                dateAt: state.filters.dateAt,
                page: state.currentPage
            })
            commit("setLogs", logs)
            commit("setPagination", pagination)
        },
        setNextPage({ commit, dispatch, state }) {
            if (!state.pagination) {
                return
            }
            const { total, count, per_page, current_page } = state.pagination
            if (total == per_page * (current_page - 1) + count) {
                return
            }
            commit("setNextPage")
            dispatch("fetchReportLogs")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchReportLogs")
        },
    },
    namespaced: true
}