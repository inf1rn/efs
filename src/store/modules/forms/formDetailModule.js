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
                statusId: "",
                dateAt: "",
                dateTo: ""
            },
            formEditableData: {
                frequency: "",
                activeStart: "",
                activeEnd: "",
                statusId: ""
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
        setFormStatFiltersDateAt(state, dateAt) {
            state.formStatFilters = {
                ...state.formStatFilters,
                dateAt
            }
        },
        setFormStatFiltersDateTo(state, dateTo) {
            state.formStatFilters = {
                ...state.formStatFilters,
                dateTo
            }
        },
        clearFormStatFilters(state) {
            state.formStatFilters = {
                isPublished: "",
                createdAt: ""
            }
        },
        setFrequency(state, frequency) {
            state.formEditableData = {
                ...state.formEditableData,
                frequency,
            }
        },
        setActiveStart(state, activeStart) {
            state.formEditableData = {
                ...state.formEditableData,
                activeStart
            }
        },
        setActiveEnd(state, activeEnd) {
            state.formEditableData = {
                ...state.formEditableData,
                activeEnd
            }
        },
        setStatusId(state, statusId) {
            state.formEditableData = {
                ...state.formEditableData,
                statusId
            }
        },
        setFiltersStatusId(state, statusId) {
            state.formStatFilters = {
                ...state.formStatFilters,
                statusId
            }
        }
    },
    actions: {
        async fetchForm({ commit, state }) {
            const { data: { data: form } } = await formsAPI.fetchForm(
                state.formId,
            )
            commit("setForm", form)
            commit("setFields", form.fields)
            commit("setFrequency", form.frequency)
            commit("setStatusId", form.status.id)
            commit("setActiveStart", new Date(form.active_start).toISOString().slice(0, 10))
            commit("setActiveEnd", new Date(form.active_end).toISOString().slice(0, 10))
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
                })),
                frequency: state.formEditableData.frequency,
                active_start: state.formEditableData.activeStart,
                active_end: state.formEditableData.activeEnd,
                status_id: state.formEditableData.status_id
            }
            )
            alert("Сохранено")
            dispatch("fetchForm")

        },
        async createField({ state, dispatch }, field) {
            await formsAPI.createField(state.formId, field)
            alert("Поле создано")
            dispatch("fetchForm")
        },
        async deleteField({ state, dispatch }, fieldId) {
            try {
                await formsAPI.deleteField(state.formId, fieldId)
                dispatch("fetchForm")
                alert("Поле удалено")
            } catch (e) {
                console.log('************* error')
                console.log(e)
                alert('Невозможно удалить заполненное ранее поле')
            }
        },
        async toggleEnabledField({ state, dispatch }, fieldId) {
            const field = { ...state.fields.find(field => field.id = fieldId) }
            field.enabled = !field.enabled
            await formsAPI.changeField(state.formId, field)
            if (field.enabled) {
                alert("Поле включено")
            } else {
                alert("Поле выключено")
            }
            dispatch("fetchForm")
        },
        async fetchFormStatResults({ state, commit }) {
            const { dateAt, dateTo, isPublished, statusId } = state.formStatFilters
            let filters = { dateAt, dateTo, isPublished: "", isAccepted: "", statusId }
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