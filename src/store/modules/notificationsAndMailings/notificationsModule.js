import { mailingsAPI } from "@/API/mailings"

export const notificationsModule = {
    state() {
        return {
            notifications: [],
            filters: {
                dateAt: "",
                dateTo: "",
                roleId: "",
                regionId: ""
            },
            pagination: null,
            currentPage: 1,
            removableNotificationId: null
        }
    },
    mutations: {
        setNotifications(state, notifications) {
            state.notifications = notifications
        },
        setFiltersRegionId(state, regionId) {
            state.filters = {
                ...state.filters,
                regionId
            }
        },
        setFiltersRoleId(state, roleId) {
            state.filters = {
                ...state.filters,
                roleId
            }
        },

        setFiltersDateAt(state, dateAt) {
            state.filters = {
                ...state.filters,
                dateAt
            }
        },
        setFiltersDateTo(state, dateTo) {
            state.filters = {
                ...state.filters,
                dateTo
            }
        },
        clearFilters(state) {
            state.filters = {
                dateAt: "",
                dateTo: "",
                roleId: "",
                regionId: ""
            }
        },
        setPagination(state, pagination) {
            state.pagination = pagination
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setPrevPage(state) {
            state.currentPage -= 1
        },
        setRemovableNotificationId(state, notificationId) {
            state.removableNotificationId = notificationId
        }
    },
    actions: {
        async fetchNotifications({ commit, state }) {
            const { data: { data: { data: notifications, pagination } } } = await mailingsAPI.fetchMailings(
                {
                    mailingsType: 2,
                    roleId: state.filters.roleId,
                    regionId: state.filters.regionId,
                    dateAt: state.filters.dateAt,
                    dateTo: state.filters.dateTo
                },
                state.currentPage)
            commit("setNotifications", notifications)
            commit("setPagination", pagination)
        },
        setFiltersRegionId({ commit, dispatch }, regionId) {
            commit("setFiltersRegionId", regionId)
            dispatch("fetchNotifications")
        },
        setFiltersRoleId({ commit, dispatch }, roleId) {
            commit("setFiltersRoleId", roleId)
            dispatch("fetchNotifications")
        },
        clearFilters({ commit, dispatch }) {
            commit("clearFilters")
            dispatch("fetchNotifications")
        },
        setNextPage({ commit, dispatch, state }) {
            if (!state.pagination) {
                return
            }
            const { total, count, per_page, current_page } = state.pagination
            if (total == per_page * (current_page - 1) + count) {
                return
            }
            commit("setNextPage")
            dispatch("fetchNotifications")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchNotifications")
        },
        async deleteNotification({ dispatch, commit, state }) {
            await mailingsAPI.deleteMailing(state.removableNotificationId)
            dispatch("fetchNotifications")
            commit("setRemovableNotificationId", null)
        }
    },
    namespaced: true
}