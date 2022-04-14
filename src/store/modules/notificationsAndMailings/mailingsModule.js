import { mailingsAPI } from "@/API/mailings"
import { dateFormat } from "@/utils/dateFormat"

export const mailingsModule = {
    state() {
        return {
            mailings: [],
            filters: {
                date: "",
                roleId: "",
                regionId: ""
            },
            pagination: null,
            currentPage: 1,
            removableMailingId: null
        }
    },
    mutations: {
        setMailings(state, mailings) {
            state.mailings = mailings
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
        setFiltersDate(state, date) {
            state.filters = {
                ...state.filters,
                date
            }
        },
        clearFilters(state) {
            state.filters = {
                date: "",
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
        setRemovableMailingId(state, mailingId) {
            state.removableMailingId = mailingId
        }
    },
    actions: {
        async fetchMailings({ commit, state }) {
            const { data: { data: { data: mailings, pagination } } } = await mailingsAPI.fetchMailings(
                {
                    mailingsType: 3,
                    roleId: state.filters.roleId,
                    regionId: state.filters.regionId,
                    sendAt: state.filters.date
                },
                state.currentPage)
            commit("setMailings", mailings)
            commit("setPagination", pagination)
        },
        setFiltersRegionId({ commit, dispatch }, regionId) {
            commit("setFiltersRegionId", regionId)
            dispatch("fetchMailings")
        },
        setFiltersRoleId({ commit, dispatch }, roleId) {
            commit("setFiltersRoleId", roleId)
            dispatch("fetchMailings")
        },
        setFiltersDate({ commit, dispatch }, date) {
            commit("setFiltersDate", date)
            dispatch("fetchMailings")
        },
        clearFilters({ commit, dispatch }) {
            commit("clearFilters")
            dispatch("fetchMailings")
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
            dispatch("fetchMailings")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchMailings")
        },
        async deleteMailing({ dispatch, commit, state }) {
            await mailingsAPI.deleteMailing(state.removableMailingId)
            dispatch("fetchMailings")
            commit("setRemovableMailingId", null)
        }
    },
    namespaced: true
}