import { mailingsAPI } from "../../../API/mailings"

export const newEventModule = {
    state() {
        return {
            event: {
                title: "",
                theme: "",
                sendAt: "",
                regionId: "",
                periodId: "",
                formId: "",
                roleId: "",
                body: "",
                eventTypeId: "",
                statusId: 1
            }
        }
    },
    mutations: {
        setTitle(state, title) {
            state.event = {
                ...state.event,
                title
            }
        },
        setTheme(state, theme) {
            state.event = {
                ...state.event,
                theme
            }
        },
        setSendAt(state, sendAt) {
            state.event = {
                ...state.event,
                sendAt
            }
        },
        setRegionId(state, regionId) {
            state.event = {
                ...state.event,
                regionId
            }
        },
        setPeriodId(state, periodId) {
            state.event = {
                ...state.event,
                periodId
            }
        },
        setFormId(state, formId) {
            state.event = {
                ...state.event,
                formId
            }
        },
        setRoleId(state, roleId) {
            state.event = {
                ...state.event,
                roleId
            }
        },
        setBody(state, body) {
            state.event = {
                ...state.event,
                body
            }
        },
        setEventTypeId(state, eventTypeId) {
            state.event = {
                ...state.event,
                eventTypeId
            }
        },
        setStatusId(state, statusId) {
            state.event = {
                ...state.event,
                statusId
            }
        }
    },
    actions: {
        async saveEvent({ state }) {
            await mailingsAPI.saveMailing(state.event)
            alert("Создано")
        }
    },
    namespaced: true
}