import { convertMailingToForm } from "@/utils/Objects/convertMailingToForm"
import { mailingsAPI } from "../../../API/mailings"

export const currentNotificationModule = {
    state() {
        return {
            notification: null,
            notificationId: null,
            notificationForm: null
        }
    },
    mutations: {
        setNotification(state, notification) {
            state.notification = notification
        },
        setNotificationId(state, notificationId) {
            state.notificationId = notificationId
        },
        setNotificationForm(state, notificationForm) {
            state.notificationForm = notificationForm
        },
        setTitle(state, title) {
            state.notificationForm = {
                ...state.notificationForm,
                title
            }
        },
        setTheme(state, theme) {
            state.notificationForm = {
                ...state.notificationForm,
                theme
            }
        },
        setSendAt(state, sendAt) {
            state.notificationForm = {
                ...state.notificationForm,
                sendAt
            }
        },
        setRegionId(state, regionId) {
            state.notificationForm = {
                ...state.notificationForm,
                regionId
            }
        },
        setPeriodId(state, periodId) {
            state.notificationForm = {
                ...state.notificationForm,
                periodId
            }
        },
        setFormId(state, formId) {
            state.notificationForm = {
                ...state.notificationForm,
                formId
            }
        },
        setRoleId(state, roleId) {
            state.notificationForm = {
                ...state.notificationForm,
                roleId
            }
        },
        setBody(state, body) {
            state.notificationForm = {
                ...state.notificationForm,
                body
            }
        },
        setEventTypeId(state, eventTypeId) {
            state.notificationForm = {
                ...state.notificationForm,
                eventTypeId
            }
        },
        setStatusId(state, statusId) {
            state.notificationForm = {
                ...state.notificationForm,
                statusId
            }
        }
    },
    actions: {
        async fetchNotification({ state, commit }) {
            const { data: { data: notification } } = await mailingsAPI.fetchMailingById(state.notificationId)
            commit("setNotification", notification)
            commit("setNotificationForm", convertMailingToForm(notification))
        },
        async updateNotification({ state, commit }) {
            await mailingsAPI.updateMailing(state.notificationForm)
            alert("Обновлено!")
        }
    },
    namespaced: true
}