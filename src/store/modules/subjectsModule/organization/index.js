import { regionsAPI } from "@/API/regions"
import { organizationsAPI } from "@/API/organizations"
import { organizationEditModule } from "./organizationEditModule"
import { currentOrganizationModule } from "./currentOrganizationModule"
import { cloneDeep } from "lodash"
import { newOrganizationModule } from "./newOrganizationModule"

export const organizationModule = {
    state() {
        return {
            organizationId: null,
            regionId: null,
            region: null
        }
    },
    mutations: {
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
        async fetchOrganization({ commit, state }) {
            const { data: { data: organization } } = await organizationsAPI.fetchOrganizationById(state.organizationId)
            commit("subjects/organization/currentOrganization/setOrganization", cloneDeep(organization), { root: true })
            organization.region_id = state.regionId
            commit("subjects/organization/organizationEdit/setFormOrganization", cloneDeep(organization), { root: true })
        },
        async fetchRegion({ commit, state }) {
            const { data: { data: region } } = await regionsAPI.fetchRegion(state.regionId)
            commit("setRegion", region)
        },
    },
    modules: {
        organizationEdit: organizationEditModule,
        currentOrganization: currentOrganizationModule,
        newOrganization: newOrganizationModule
    },
    namespaced: true
}