import { formsAPI } from "@/API/forms"

export const formsApprovalModule = {
    state() {
        return {
            forms: [],
            pagination: null,
            currentPage: 1,
            filters: {
                keyword: ""
            }
        }
    },
    mutations: {
        setForms(state, forms) {
            state.forms = forms
        },
        setPagination(state, pagination) {
            state.pagination = pagination
        },
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage
        },
        setKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
            }
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setPrevPage(state) {
            state.currentPage -= 1
        },
    },
    actions: {
        async fetchFormsApproval({ state, commit }) {
            const { data: { data: { results: forms, pagination } } } = await formsAPI.fetchNotApprovedForms({ keyword: state.filters.keyword, page: state.currentPage })
            commit("setForms", forms)
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
            dispatch("fetchFormsApproval")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchFormsApproval")
        },
    },
    namespaced: true
}