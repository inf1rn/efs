import { regionsAPI } from "@/API/regions";
import { citiesAPI } from "@/API/cities";

export const locationModule = {
    state() {
        return {
            regions: [],
            cities: [],
        }
    },
    getters: {
        getRegionByRegionName: state => regionName => {
            return state.regions
                .find(region => region.title === regionName || region.title.toLowerCase().startsWith(regionName.toLowerCase())
                )
        },
        getRegionByRegionId: state => regionId => {
            return state.regions.find(region => region.id === regionId)
        }
    },
    mutations: {
        setRegions(state, regions) {
            state.regions = regions
        },
        setCities(state, cities) {
            state.cities = cities
        }
    },
    actions: {
        async getRegions({ commit }) {
            const { data } = await regionsAPI.fetchRegions()
            commit("setRegions", data.data.data)
        },
        async getCities({ commit }) {
            const { data } = await citiesAPI.fetchCities()
            commit("setCities", data.data.data)
        }
    },
    namespaced: true
}