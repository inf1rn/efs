import { mailingsAPI } from "@/API/mailings"
import { convertMailingToForm } from "@/utils/Objects/convertMailingToForm"

export const currentMailingModule = {
    state() {
        return {
            currentMailing: null,
            currentMailingId: null,
            currentMailingForm: null
        }
    },
    mutations: {
        setCurrentMailing(state, currentMailing) {
            state.currentMailing = currentMailing
        },
        setCurrentMailingId(state, mailingId) {
            state.currentMailingId = mailingId
        },
        setCurrentMailingForm(state, currentMailing) {
            state.currentMailingForm = currentMailing
        },
        setTitle(state, title) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                title
            }
        },
        setTheme(state, theme) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                theme
            }
        },
        setSendAt(state, sendAt) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                sendAt
            }
        },
        setRegionId(state, regionId) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                regionId
            }
        },
        setPeriodId(state, periodId) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                periodId
            }
        },
        setFormId(state, formId) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                formId
            }
        },
        setRoleId(state, roleId) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                roleId
            }
        },
        setBody(state, body) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                body
            }
        },
        setEventTypeId(state, eventTypeId) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                eventTypeId
            }
        },
        setStatusId(state, statusId) {
            state.currentMailingForm = {
                ...state.currentMailingForm,
                statusId
            }
        }
    },
    actions: {
        async fetchMailing({ state, commit }) {
            const { data: { data: mailing } } = await mailingsAPI.fetchMailingById(state.currentMailingId)
            commit("setCurrentMailing", mailing)
            commit("setCurrentMailingForm", convertMailingToForm(mailing))
        },
        async updateMailing({ state }) {

            try {
                await mailingsAPI.updateMailing(state.currentMailingForm)
                alert("Обновлено")
            } catch (e) {
                console.log(e)
                alert("Ошибка")
            }
        }
    },
    namespaced: true
}