import { reportsAllModule } from "./reportsAllModule";
import { reportTemplatesModule } from "./reportTemplatesModule";
import { formsAPI } from "@/API/forms"
import { reportHistoryRequestsModule } from "./reportsHistoryRequestsModule";

export const reportsModule = {
    state() {
        return {
            forms: []
        }
    },
    mutations: {
        setForms(state, forms) {
            state.forms = forms
        }
    },
    getters: {
        getFormByFormId: state => formId => {
            return state.forms.find(form => form.id === formId)
        }
    },
    actions: {
        async fetchForms({ commit }) {
            const { data: { data: forms } } = await formsAPI.fetchForms({})
            commit("setForms", forms)
        }
    },
    modules: {
        reportsAll: reportsAllModule,
        reportTemplates: reportTemplatesModule,
        reportHistoryRequests: reportHistoryRequestsModule
    },
    namespaced: true
}