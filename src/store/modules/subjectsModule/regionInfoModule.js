import { organizationsAPI } from "@/API/organizations"
import { regionsAPI } from "@/API/regions"
import { cloneDeep } from "lodash"

export const regionInfoModule = {
    state() {
        return {
            organizations: [],
            regionStat: [],
            regionId: null,
            region: null,
            formDescription: null,
            filters: {
                title: ""
            },
            removableOrganizationId: null
        }
    },
    mutations: {
        setOrganizations(state, organizations) {
            state.organizations = organizations
        },
        setRegionStat(state, regionStat) {
            state.regionStat = regionStat
        },
        setRegionId(state, regionId) {
            state.regionId = regionId
        },
        setRegion(state, region) {
            state.region = region
        },
        setFiltersTitle(state, title) {
            state.filters = {
                ...state.filters, title
            }
        },
        setFormDescription(state, description) {
            state.formDescription = description
        },
        setRemovableOrganizationId(state, removableOrganizationId) {
            state.removableOrganizationId = removableOrganizationId
        }
    },
    actions: {
        async getOrganizations({ commit, state }, withEmployees) {
            let { data: { data: { data: organizations } } } = await organizationsAPI.fetchOrganizations({ regionId: state.regionId, title: state.filters.title })
            if (withEmployees) {
                await Promise.all(organizations.map(async organization => {
                    const { data: { data: { data: allEmployees } } } = await organizationsAPI.fetchOrganizationEmployees(organization.id)
                    organization.employees = allEmployees.filter(employee => employee.sort !== 1)
                    organization.mainEmployee = allEmployees.find(employee => employee.sort === 1)
                }))
            }

            commit("setOrganizations", organizations)
        },
        async getRegionStat({ commit, state }) {
            const { data: { data: regionStat } } = await regionsAPI.fetchRegionStat(state.regionId)
            commit("setRegionStat", regionStat)
        },
        async getRegion({ commit, state }) {
            const { data: { data: region } } = await regionsAPI.fetchRegion(state.regionId)
            commit("setRegion", region)
            commit("setFormDescription", region.description ? region.description : "")
        },
        async updateRegion({ commit, state }) {
            const region = cloneDeep(state.region)
            region.description = state.formDescription
            const { data: { data: updatedRegion } } = await regionsAPI.updateRegion(state.regionId, region)
            alert("Обновлено")
            commit("setRegion", updatedRegion)
            commit("setFormDescription", updatedRegion.description)
        },
        async deleteOrganization({ commit, dispatch, state }) {
            await organizationsAPI.deleteOrganization(state.removableOrganizationId)
            dispatch("getOrganizations")
            commit("setRemovableOrganizationId", null)
        }

    },
    namespaced: true
}