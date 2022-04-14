import { mailingsAPI } from "@/API/mailings";
import { currentMailingModule } from "./currentMailingModule";
import { currentNotificationModule } from "./currentNotificationModule";
import { mailingsModule } from "./mailingsModule";
import { newEventModule } from "./newEventModule";
import { notificationsModule } from "./notificationsModule";

export const notificationsAndMailingsModule = {
    state() {
        return {
            eventTypes: [],
            periodTypes: []
        }
    },
    mutations: {
        setEventTypes(state, eventTypes) {
            state.eventTypes = eventTypes
        },
        setPeriodTypes(state, periodTypes) {
            state.periodTypes = periodTypes
        }
    },
    actions: {
        async fetchMailingFormData({ commit }) {
            const { data: {data: formData} } = await mailingsAPI.fetchMailingFormData()
            commit("setPeriodTypes", formData.mailing_period_id)
            commit("setEventTypes", formData.mailing_type_id)
        }
    },
    modules: {
        notifications: notificationsModule,
        currentNotification: currentNotificationModule,
        currentMailing: currentMailingModule,
        mailings: mailingsModule,
        newEvent: newEventModule
    },
    namespaced: true
}