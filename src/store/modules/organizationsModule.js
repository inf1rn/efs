import { organizationsAPI } from "@/API/organizations"
import { positionsAPI } from "@/API/positions"

export const organizationsModule = {
    state() {
        return {
            positions: [],
            organizations: []
        }
    },
    mutations: {
        setPositions(state, positions) {
            state.positions = positions
        },
        setOrganizations(state, organizations) {
            state.organizations = organizations
        }
    },
    actions: {
        async fetchPositions({commit}) {
            const {data: {data: positions}} = await positionsAPI.fetchPositions()
            commit("setPositions", positions)
        },
        async fetchOrganizations({commit}) {
            const {data: {data: {data: organizations}}} = await organizationsAPI.fetchOrganizations()
            commit("setOrganizations", organizations)
        }
    },
    namespaced: true
}