import { regionsAPI } from "@/API/regions"
import { organizationsAPI } from "@/API/organizations"

export const organizationInfoModule = {
    state() {
        return {
            organization: null,
            organizationId: null,
            regionId: null,
            region: null
        }
    },
    getters: {
        getMainEmployee(state) {
            return state.organization?.employees.find(employee => employee.sort === 1)
        },
        getEmployees(state) {
            return state.organization?.employees.filter(employee => employee.sort !== 1)
        }
    },
    mutations: {
        setOrganization(state, organization) {
            state.organization = organization
        },
        setOrganizationId(state, organizationId) {
            state.organizationId = organizationId
        },
        setRegionId(state, regionId) {
            state.regionId = regionId
        },
        setRegion(state, region) {
            state.region = region
        }
    },
    actions: {
        async getOrganization({ commit, state }) {
            const { data } = await organizationsAPI.fetchOrganizationById(state.organizationId)
            commit("setOrganization", data.data)
        },
        async getRegion({ commit, state }) {
            const { data: { data: region } } = await regionsAPI.fetchRegion(state.regionId)
            commit("setRegion", region)
        },
        setOrganizationId({ commit }, organizationId) {
            commit("setOrganizationId", organizationId)
        },
        setRegionId({ commit }, regionId) {
            commit("setRegionId", regionId)
        }
    },
    namespaced: true
}