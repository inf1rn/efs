import { usersAPI } from "@/API/users"
import { authAPI } from "@/API/auth"
import { cloneDeep } from "lodash"

// TODO

export const usersAllModule = {
    state() {
        return {
            users: [],
            filters: {
                keyword: "",
                dateFrom: "",
                dateTo: "",
                regionId: "",
                cityId: "",
                roleId: ""
            },
            removableUserId: null
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        setFiltersKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
            }
        },
        setFiltersDateTo(state, dateTo) {
            state.filters = {
                ...state.filters,
                dateTo
            }
        },
        setFiltersDateFrom(state, dateFrom) {
            state.filters = {
                ...state.filters,
                dateFrom
            }
        },
        setFiltersCityId(state, cityId) {
            state.filters = {
                ...state.filters,
                cityId
            }
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
        clearFilters(state) {
            state.filters = {
                keyword: "",
                dateFrom: "",
                dateTo: "",
                regionId: "",
                cityId: "",
                roleId: ""
            }
        },
        setRemovableUserId(state, userId) {
            state.removableUserId = userId
        }
    },
    actions: {
        async getUsers({ commit, state }) {
            const { data: { data: { data: users } } } = await usersAPI.fetchUsers(state.filters)
            commit("setUsers", users)
        },
        setFiltersKeyword({ commit, dispatch }, keyword) {
            commit("setFiltersKeyword", keyword)
            dispatch("getUsers")
        },
        setFiltersDateFrom({ commit, dispatch }, dateFrom) {
            commit("setFiltersDateFrom", dateFrom)
            dispatch("getUsers")
        },
        setFiltersDateTo({ commit, dispatch }, dateTo) {
            commit("setFiltersDateTo", dateTo)
            dispatch("getUsers")
        },
        setFiltersRegionId({ commit, dispatch }, regionId) {
            commit("setFiltersRegionId", regionId)
            dispatch("getUsers")
        },
        setFiltersCityId({ commit, dispatch }, cityId) {
            commit("setFiltersCityId", cityId)
            //TODO: refactor dispatch
            dispatch("getUsers")
        },
        clearFilters({ commit, dispatch }) {
            commit("clearFilters")
            dispatch("getUsers")
        },
        async deleteUser({ commit, dispatch, state }) {
            await usersAPI.deleteUser(state.removableUserId)
            dispatch("getUsers")
            commit("setRemovableUserId", null)
        }
    },
    namespaced: true
}