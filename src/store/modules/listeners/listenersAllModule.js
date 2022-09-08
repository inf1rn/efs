import { listenersAPI } from "@/API/listeners"

export const listenersAllModule = {
    state() {
        return {
            listeners: [],
            pagination: null,
            currentPage: 1,
            listenersCSV: null,
            filters: {
                keyword: ""
            }
        }
    },
    mutations: {
        setListeners(state, listeners) {
            state.listeners = listeners
        },
        setPagination(state, pagination) {
            state.pagination = pagination
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setFiltersKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
            }
        },
        setPrevPage(state) {
            state.currentPage -= 1
        },
        setListenersCSV(state, listenersCSV) {
            state.listenersCSV = listenersCSV
        }
    },
    actions: {
        async fetchListeners({ commit, state }) {
            const { data: { data: { data: listeners, pagination } } } = await listenersAPI.fetchListeners({ page: state.currentPage, perPage: 10, keyword: state.filters.keyword })
            commit("setListeners", listeners)
            commit("setPagination", pagination)
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
            dispatch("fetchListeners")
        },
        setPrevPage({ commit, dispatch, state }) {
            if (state.currentPage == 1) {
                return
            }
            commit("setPrevPage")
            dispatch("fetchListeners")
        },
        async uploadListenersCSV({ state, commit }) {
            await listenersAPI.uploadListenerCSV(state.listenersCSV)
            alert("Слушатели импортированы")
            commit("setListenerCSV", null)
        }
    },
    namespaced: true
}