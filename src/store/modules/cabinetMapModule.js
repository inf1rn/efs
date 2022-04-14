import { regionsAPI } from "@/API/regions";

export const cabinetMapModule = {
    state() {
        return {
            currentRegionId: 1,
            regionStat: null,
            currentRegionName: null,
            filters: {
                regionName: "",
                objects: "Субъекты",
                period: "Ноябрь 2021",
            },
            loaded: false
        }
    },
    mutations: {
        setRegionStat(state, stat) {
            state.regionStat = stat
        },
        setCurrentRegionId(state, regionId) {
            state.currentRegionId = regionId
        },
        setFiltersRegionName(state, regionName) {
            state.filters = {
                ...state.filters,
                regionName
            }
        },
        setFiltersPeriod(state, period) {
            state.filters = {
                ...state.filters,
                period
            }
        },
        setCurrentRegionName(state, currentRegionName) {
            state.currentRegionName = currentRegionName
        },
        clearFilters(state) {
            state.filters = {
                regionName: "",
                objects: "Субъекты",
                period: "Ноябрь 2021",
            },
            state.currentRegionName = ""
            state.regionStat = null
        }
    },
    actions: {
        getRegionStat: async function ({ commit, state }) {
            const { data } = await regionsAPI.fetchRegionStat(state.currentRegionId)
            commit("setRegionStat", data.data)
        },
    },
    namespaced: true
}