import { reportsAPI } from "@/API/reports"

export const reportTemplatesModule = {
    state() {
        return {
            templates: []
        }

    },
    mutations: {
        setTemplates(state, templates) {
            state.templates = templates
        },
    },
    actions: {
        async fetchReportTemplates({ commit }) {
            const { data: { data: { results: templates } } } = await reportsAPI.fetchReportTemplates({})
            commit("setTemplates", templates)
        }
    },
    namespaced: true
}