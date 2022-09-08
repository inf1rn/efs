import { changePropertyById } from "@/utils/Objects/changePropertyById"
import { cloneDeep } from "lodash"
import { formsAPI } from "@/API/forms"

export const newFormModule = {
    state() {
        return {
            name: "",
            frequency: "daily",
            activeDateFrom: "",
            activeDateBefore: "",
            fields: []
        }
    },
    mutations: {
        setName(state, name) {
            state.name = name
        },
        setFrequency(state, frequency) {
            state.frequency = frequency
        },
        setActiveDateFrom(state, activeDateFrom) {
            state.activeDateFrom = activeDateFrom
        },
        setActiveDateBefore(state, activeDateBefore) {
            state.activeDateBefore = activeDateBefore
        },
        setNewEmptyField(state) {
            const fields = state.fields
            const fieldId = fields[fields.length - 1] ? fields[fields.length - 1].id + 1 : 1
            state.fields = [
                ...state.fields,
                {
                    title: "Новое поле",
                    description: "",
                    type: "string",
                    required: false,
                    sort: 0,
                    enabled: true,
                    id: fieldId
                }
            ]
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
        createField(state, field) {
            const fields = state.fields
            const fieldId = fields[fields.length - 1] ? fields[fields.length - 1].id + 1 : 1

            field = cloneDeep(field)
            field.id = fieldId
            state.fields = [
                ...state.fields,
                field
            ]
        },
        deleteField(state, fieldId) {
            state.fields = state.fields.filter(field => field.id != fieldId)
        },
        toggleEnabledField(state, fieldId) {
            state.fields = [...state.fields.map(field => {
                if (field.id === fieldId) {
                    field.enabled = !field.enabled
                }
                return field
            })]
        },
        clearNewForm(state) {
            state = {
                name: "",
                frequency: "daily",
                activeDateFrom: "",
                activeDateBefore: "",
                fields: []
            }
        }
    },
    actions: {
        async saveForm({ state, commit }) {
            const changedFields = cloneDeep(state.fields)
            changedFields.forEach(field => {
                delete field.id
                return field
            })

            await formsAPI.createForm({
                name: state.name,
                fields: changedFields,
                status_id: 1,
                activeDateBefore: state.activeDateBefore,
                activeDateFrom: state.activeDateFrom,
                frequency: state.frequency
            })
            commit("clearNewForm")
            alert("Создано")
        }
    },
    namespaced: true
}