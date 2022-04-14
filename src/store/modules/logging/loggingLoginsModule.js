import { loggingAPI } from "@/API/logging"

export const loggingLoginsModule = {
    state() {
        return {
            pagination: null,
            currentPage: 1,
            loginLogs: [],
        }
    },
    mutations: {
        setLoginLogs(state, loginLogs) {
            state.loginLogs = loginLogs
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
        async fetchLoginLogs({ state, commit }) {
            const { data: { data: { data: loginLogs, pagination } } } = await loggingAPI.fetchLoginLogs(state.currentPage)
            commit("setLoginLogs", loginLogs)
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
            dispatch("fetchLoginLogs")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchLoginLogs")
        }
    },
    namespaced: true
}