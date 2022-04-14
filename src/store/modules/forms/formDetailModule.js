import { formsAPI } from "@/API/forms"
import { changePropertyById } from "@/utils/Objects/changePropertyById"

export const formDetailModule = {
    state() {
        return {
            form: {},
            fields: [],
            formId: null,
            results: [],
            statResults: [],
            formStatFilters: {
                isPublished: "",
                createdAt: ""
            }
        }
    },
    mutations: {
        setForm(state, form) {
            state.form = form
        },
        setFields(state, fields) {
            state.fields = fields
        },
        setFieldTitle(state, fieldData) {
            state.fields = changePropertyById(state.fields, fieldData.id, fieldData, "title")
        },
        setFieldDescription(state, fieldData) {
            state.fields = changePropertyById(state.fields, fieldData.id, fieldData, "description")
        },
        setFieldType(state, fieldData) {
            state.fields = changePropertyById(state.fields, fieldData.id, fieldData, "type")
        },
        setFieldRequired(state, fieldData) {
            state.fields = changePropertyById(state.fields, fieldData.id, fieldData, "required")
        },
        setFormId(state, formId) {
            state.formId = formId
        },
        setFormResults(state, results) {
            state.results = results
        },
        setFormStatResults(state, statResults) {
            state.statResults = statResults
        },
        setFormStatFiltersIsPublished(state, isPublished) {
            state.formStatFilters = {
                ...state.formStatFilters,
                isPublished
            }
        },
        setFormStatFiltersCreatedAt(state, createdAt) {
            state.formStatFilters = {
                ...state.formStatFilters,
                createdAt
            }
        },
        clearFormStatFilters(state) {
            state.formStatFilters = {
                isPublished: "",
                createdAt: ""
            }
        }
    },
    actions: {
        async fetchForm({ commit, state }) {
            const { data: { data: form } } = await formsAPI.fetchForm(state.formId)
            commit("setForm", form)
            commit("setFields", form.fields)
        },
        async saveFields({ state, dispatch }) {
            await formsAPI.updateForm(state.formId, {
                title: state.form.title,
                fields: state.fields.map(field => ({
                    title: field.title,
                    description: field.description,
                    type: field.type,
                    required: field.required,
                    sort: field.sort,
                    enabled: field.enabled,
                    id: field.id
                }))
            }
            )
            dispatch("fetchForm")

        },
        async createField({ state, dispatch }, field) {
            await formsAPI.createField(state.formId, field)
            dispatch("fetchForm")
        },
        async deleteField({ state, dispatch }, fieldId) {
            await formsAPI.deleteField(state.formId, fieldId)
            dispatch("fetchForm")
        },
        async toggleEnabledField({ state, dispatch }, fieldId) {
            const field = { ...state.fields.find(field => field.id = fieldId) }
            field.enabled = !field.enabled
            await formsAPI.changeField(state.formId, field)
            dispatch("fetchForm")
        },
        async fetchFormStatResults({ state, commit }) {
            const { createdAt, isPublished } = state.formStatFilters
            let filters = { createdAt, isPublished: "", isAccepted: "" }
            if (isPublished === "draft") {
                filters.isPublished = false
            } else if (isPublished) {
                filters.isAccepted = !!+isPublished
            }
            //TODO: refactor this

            const { data: { data: { data: results } } } = await formsAPI.fetchFormStatResults(state.formId, filters)
            commit("setFormStatResults", results)
        }
    },
    namespaced: true
}