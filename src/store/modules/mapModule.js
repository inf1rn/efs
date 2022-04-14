import { regionsAPI } from "@/API/regions"

export const mapModule = {
    state() {
        return {
            regionStat: null,
            currentRegionId: null
        }
    },
    mutations: {
        setRegionStat(state, regionStat) {
            state.regionStat = regionStat
        },
        setCurrentRegionId(state, currentRegionId) {
            state.currentRegionId = currentRegionId
        }
    },
    actions: {
        getRegionStat: async function ({ commit, state }) {
            const { data } = await regionsAPI.fetchRegionStat(state.currentRegionId)
            commit("setRegionStat", data.data)
        }
    },
    namespaced: true
}