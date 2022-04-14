import { formsAPI } from "@/API/forms"

export const formApprovalModule = {
    state() {
        return {
            form: null,
            formId: null,
            declineMessage: ""
        }
    },
    mutations: {
        setForm(state, form) {
            state.form = form
        },
        setFormId(state, formId) {
            state.formId = formId
        },
        setDeclineMessage(state, declineMessage) {
            state.declineMessage = declineMessage
        }
    },
    actions: {
        async fetchFormApproval({ state, commit }) {
            const { data: { data: form } } = await formsAPI.fetchForm(state.formId)
            commit("setForm", form)
        },
        async acceptFormApproval({ state }) {
            await formsAPI.acceptFormResults(state.formId)
            alert("Согласовано")
        },
        async declineFormApproval({ state }) {
            console.log(state.declineMessage);
            await formsAPI.declineFormResults(state.formId, 2, { message: state.declineMessage })
            alert("Отправлено на доработку")
        }
    },
    namespaced: true
}