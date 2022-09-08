import { listenersAPI } from "@/API/listeners"
import _ from "lodash"
import { programsAPI } from "@/API/programs"

export const regionsListenersStatModule = {
    state() {
        return {
            listenersStat: [],
            regionsListenersStat: [],
            regionsListenersStatInit: [],
            filters: {
                regionId: "",
                cityId: ""
            },
            listenerCSV: null,
            csvUrl: null,
            xlsUrl: null,
            statistics: {
                programsCount: null
            }
        }
    },
    mutations: {
        setListenersStat(state, listenersStat) {
            state.listenersStat = listenersStat
        },
        setRegionsListenersStat(state, regionsListenersStat) {
            state.regionsListenersStat = regionsListenersStat
            state.regionsListenersStatInit = regionsListenersStat
        },
        setFiltersRegionId(state, region) {
            console.log(region)
            state.filters = {
                ...state.filters,
                regionId: region
            }

            state.regionsListenersStat = state.regionsListenersStat.filter((listenerStat) => listenerStat.region === region)
        },
        setFiltersCityId(state, cityId) {
            state.filters = {
                ...state.filters,
                cityId
            }
        },
        clearFilters(state) {
            state.filters = {
                regionId: ""
            }

            state.regionsListenersStat = state.regionsListenersStatInit
        },
        setProgramsCount(state, count) {
            state.statistics = {
                ...state.statistics,
                programsCount: count
            }
        },
        setListenerCSV(state, listenerCSV) {
            state.listenerCSV = listenerCSV
        },
        setXLSUrl(state, xlsUrl) {
            state.xlsUrl = xlsUrl
        },
        setCSVUrl(state, csvUrl) {
            state.csvUrl = csvUrl
        }
    },
    actions: {
        async fetchListenersStat({ state, commit }) {
            const { data: { data: listeners } } = await listenersAPI.fetchRegionsListenersStat()
            commit("setListenersStat", listeners)
        },
        async fetchRegionsListenersStat({ state, commit }) {
            const filters = state.filters
            
            const { data: { data: { data: listeners, pagination } } } = await listenersAPI.fetchListeners({})
            const { data: { data: { url: csvUrl } } } = await listenersAPI.fetchListenersExport({ type: "csv", regionId: filters.regionId })
            const { data: { data: { url: xlsUrl } } } = await listenersAPI.fetchListenersExport({ type: "xls", regionId: filters.regionId })

            commit("setCSVUrl", csvUrl)
            commit("setXLSUrl", xlsUrl)

            const regions = _.uniq(listeners.map((listener) => listener.region_name))

            const regionStatListeners = []

            for (let region of regions) {
                const regionListeners = listeners.filter((listener) => listener.region_name === region && (!state.filters.regionId || listener.region_name == state.filters.regionId))
                const regionListenersOrganizations = regionListeners.map((listener) => listener.organization_name)

                const listenersCount = _.countBy(regionListenersOrganizations)
                for (let organization of Object.keys(listenersCount)) {
                    regionStatListeners.push({
                        region,
                        organization,

                        count: listenersCount[organization]
                    })
                }
            }

            commit("setRegionsListenersStat", regionStatListeners)
        },
        async uploadListenerCSV({ state, commit }) {
            await listenersAPI.uploadListenerCSV(state.listenerCSV)
            alert("Слушатель импортирован")
            commit("setListenerCSV", null)
        },
        async fetchStatistics({ commit }) {
            const { data: { data: programs } } = await programsAPI.fetchPrograms()
            commit("setProgramsCount", programs.length)
        },
    },
    namespaced: true
}