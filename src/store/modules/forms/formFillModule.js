import { formsAPI } from "@/API/forms"
import { changePropertyById } from "@/utils/Objects/changePropertyById"

export const formFillModule = {
    state() {
        return {
            formId: null,
            formResults: null,
            fields: null
        }
    },
    mutations: {
        setFormResults(state, formResults) {
            state.formResults = formResults
        },
        setFormId(state, formId) {
            state.formId = formId
        },
        setFields(state, fields) {
            state.fields = fields
        },
        setFieldResult(state, { id, value }) {
            state.formResults = changePropertyById(state.formResults, id, { value }, "value")
        },
        setFormTitle(state, title) {
            state.formTitle = title
        },
        clearResults(state) {
            state.formResults = { ...state.formResults.map(result => ({ id: result.id, value: "" })) }
        }
    },
    actions: {
        async fetchFormResults({ state, commit }) {
            const { data: { data: formDataWithResults } } = await formsAPI.fetchFormResults(state.formId, {})

            const results = []
            for (let fieldGroup of formDataWithResults.fields) {
                for (let field of fieldGroup) {
                    results.push({ id: field.id, value: "" })
                }
            }
            commit("setFormResults", results)

            commit("setFields", formDataWithResults.fields)
        },
        async fetchForm({ state, commit }) {
            const { data: { data: form } } = await formsAPI.fetchForm(state.formId)
            commit("setFormTitle", form.title)
        },
        async sendFormResults({ commit, state }) {
            try {
                await formsAPI.sendFormResults(state.formId, state.formResults)
                alert("Отправлено")
                commit("clearResults")
            }
            catch (e) {
                console.log(e)
                alert("Все поля должны быть заполнены")
            }
        }
    },
    namespaced: true
}