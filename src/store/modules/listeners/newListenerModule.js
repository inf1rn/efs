import { listenersAPI } from "@/API/listeners"

export const newListenerModule = {
    state() {
        return {
            snils: "",
            cityName: "",
            organizationName: "",
            educationLevel: "",
            positionName: "",
            educationPlace: "",
            programCategory: "",
            localityType: "",
            listenerCSV: null
        }
    },
    mutations: {
        setSnils(state, snils) {
            state.snils = snils
        },
        setCityName(state, cityName) {
            state.cityName = cityName
        },
        setOrganizationName(state, organizationName) {
            state.organizationName = organizationName
        },
        setEducationLevel(state, educationLevel) {
            state.educationLevel = educationLevel
        },
        setPositionName(state, positionName) {
            state.positionName = positionName
        },
        setEdutcationPlace(state, educationPlace) {
            state.educationPlace = educationPlace
        },
        setProgramCategory(state, programCategory) {
            state.programCategory = programCategory
        },
        setLocalityType(state, localityType) {
            state.localityType = localityType
        },
        setListenerCSV(state, listenerCSV) {
            state.listenerCSV = listenerCSV
        }
    },
    actions: {
        async createListener({ commit, state }) {
            await listenersAPI.createListener(state)
            alert("Слушатель добавлен")
        },
        async uploadListenerCSV({ state, commit }) {
            await listenersAPI.uploadListenerCSV(state.listenerCSV)
            alert("Слушатель импортирован")
            commit("setListenerCSV", null)
        }
    },
    namespaced: true
}