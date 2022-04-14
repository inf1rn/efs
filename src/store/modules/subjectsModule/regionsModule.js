import { regionsAPI } from "@/API/regions";

export const regionsModule = {
    state() {
        return {
            regions: [],
            filters: {
                keyword: ""
            },
            currentChar: "С"
        }
    },
    mutations: {
        setRegions(state, regions) {
            state.regions = regions
        },
        setCurrentChar(state, char) {
            state.currentChar = char
        },
        setFiltersKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
            }
        }
    },
    actions: {
        getRegions: async function ({ commit, state }) {
            const { data: { data: { data: regions } } } = await regionsAPI.fetchRegions(state.filters.keyword ? { keyword: state.filters.keyword } : { startsWith: state.currentChar })
            commit("setRegions", regions)
        }
    },
    namespaced: true
}