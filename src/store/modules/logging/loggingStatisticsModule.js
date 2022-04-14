import { loggingAPI } from "@/API/logging"

export const loggingStatisticsModule = {
    state() {
        return {
            pagination: null,
            currentPage: 1,
            statisticsLogs: []
        }
    },
    mutations: {
        setStatisticsLogs(state, statisticsLogs) {
            state.statisticsLogs = statisticsLogs
        },
        setPagination(state, pagination) {
            state.pagination = pagination
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setPrevPage(state) {
            state.currentPage -= 1
        }
    },
    actions: {
        async fetchStatisticsLogs({ commit, state }) {
            const { data: { data: { data: statisticsLogs, pagination } } } = await loggingAPI.fetchStatisticsLogs(state.currentPage)
            commit("setStatisticsLogs", statisticsLogs)
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
            dispatch("fetchStatisticsLogs")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchStatisticsLogs")
        }
    },
    namespaced: true
}