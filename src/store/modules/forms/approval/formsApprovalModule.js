import { formsAPI } from "@/API/forms"

export const formsApprovalModule = {
    state() {
        return {
            forms: [],
            pagination: [],
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
        }
    },
    actions: {
        async fetchFormsApproval({ state, commit }) {
            const { data: { data: { data: forms, pagination } } } = await formsAPI.fetchForms({ isAccepted: "True", keyword: state.filters.keyword })
            commit("setForms", forms)
        }
    },
    namespaced: true
}