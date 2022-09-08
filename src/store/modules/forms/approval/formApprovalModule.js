import { formsAPI } from "@/API/forms"

export const formApprovalModule = {
    state() {
        return {
            form: null,
            fields: [],
            formId: null,
            resultId: null,
            declineMessage: "",
            cancel: false
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
        },
        setResultId(state, resultId) {
            state.resultId = resultId
        },
        setFields(state, fields) {
            state.fields = fields
        },
        setCancel(state, cancel) {
            state.cancel = cancel
        }
    },
    actions: {
        async fetchFormApproval({ state, commit }) {
            const { data: { data: { result: form, fields } } } = await formsAPI.fetchFormResult(state.formId, state.resultId)
            commit("setForm", form)
            commit("setFields", fields)
        },
        async acceptFormApproval({ state, commit }) {
            await formsAPI.acceptFormResults(state.formId, state.resultId)
            alert("Согласовано")
            commit("setCancel", true)
        },
        async declineFormApproval({ state, commit }) {
            console.log(state.declineMessage);
            await formsAPI.declineFormResults(state.formId, state.resultId, { message: state.declineMessage })
            alert("Отправлено на доработку")
            commit("setCancel", true)
        }
    },
    namespaced: true
}