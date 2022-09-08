import { formsAPI } from "@/API/forms"
import { cloneDeep } from "lodash"

export const formsAllModule = {
    state() {
        return {
            forms: [],
            filters: {
                keyword: "",
                statusId: "",
                dateAt: "",
                dateTo: ""
            },
            pagination: null,
            currentPage: 1,
            removableFormId: null
        }
    },
    mutations: {
        setForms(state, forms) {
            state.forms = forms
        },
        setKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
            }
        },
        setFiltersStatusId(state, statusId) {
            state.filters = {
                ...state.filters,
                statusId
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
        setRemovableFormId(state, formId) {
            state.removableFormId = formId
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
        async fetchForms({ commit, state }) {
            const { data: { data: { data: forms, pagination } } } = await formsAPI.fetchForms(
                {
                    keyword: state.filters.keyword,
                    page: state.currentPage,
                    statusId: state.filters.statusId,
                    dateAt: state.filters.dateAt,
                    dateTo: state.filters.dateTo
                }
            )
            commit("setForms", forms)
            commit("setPagination", pagination)
        },
        async toggleStatusForm({ commit, dispatch }, form) {
            const formCopy = cloneDeep(form)
            console.log(form)
            formCopy.status_id = formCopy.status.id === 1 ? 2 : 1

            await formsAPI.updateForm(formCopy.id, formCopy)
            dispatch("fetchForms")
        },
        async deleteForm({ state, dispatch, commit }, formId) {
            await formsAPI.deleteForm(state.removableFormId)
            dispatch("fetchForms")
            commit("setRemovableFormId", null)
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
            dispatch("fetchForms")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchForms")
        },
    },
    namespaced: true
}