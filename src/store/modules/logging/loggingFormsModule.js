import { loggingAPI } from "@/API/logging"

export const loggingFormsModule = {
    state() {
        return {
            pagination: null,
            currentPage: 1,
            formLogs: []
        }
    },
    mutations: {
        setFormLogs(state, formLogs) {
            state.formLogs = formLogs
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
        async fetchFormLogs({ commit, state }) {
            const { data: { data: { data: formLogs, pagination } } } = await loggingAPI.fetchFormLogs(state.currentPage)
            commit("setFormLogs", formLogs)
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
            dispatch("fetchFormLogs")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchFormLogs")
        }
    },
    namespaced: true
}