import { listenersAPI } from "@/API/listeners"

export const regionListenersModule = {
    state() {
        return {
            regionId: null,
            listeners: [],
            pagination: null,
            currentPage: 1,
            listenersCSV: null
        }
    },
    mutations: {
        setListeners(state, listeners) {
            state.listeners = listeners
        },

        setRegionId(state, regionId) {
            state.regionId = regionId
        },

        setPagination(state, pagination) {
            state.pagination = pagination
        },
        setListenersCSV(state, listenersCSV) {
            state.listenersCSV = listenersCSV
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setPrevPage(state) {
            state.currentPage -= 1
        }
    },
    actions: {
        async fetchListeners({ commit, state }) {
            const { data: { data: { data: listeners, pagination } } } = await listenersAPI.fetchListeners({ regionId: state.regionId, page: state.currentPage, perPage: 10 })

            commit("setListeners", listeners)
            commit("setPagination", pagination)
        },

        async uploadListenersCSV({ state, commit }) {
            await listenersAPI.uploadListenerCSV(state.listenersCSV)
            alert("Слушатели импортированы")
            commit("setListenerCSV", null)
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
    },
    namespaced: true
}