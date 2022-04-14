import { formsAPI } from "@/API/forms"

export const formsAllModule = {
    state() {
        return {
            forms: [],
            filters: {
                keyword: ""
            },
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
        setRemovableFormId(state, formId) {
            state.removableFormId = formId
        }
    },
    actions: {
        async fetchForms({ commit, state }) {
            const { data: { data: forms } } = await formsAPI.fetchForms({ keyword: state.filters.keyword })
            commit("setForms", forms)
        },
        async deleteForm({ state, dispatch, commit }, formId) {
            await formsAPI.deleteForm(state.removableFormId)
            dispatch("fetchForms")
            commit("setRemovableFormId", null)
        }
    },
    namespaced: true
}