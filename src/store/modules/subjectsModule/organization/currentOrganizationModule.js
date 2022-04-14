export const currentOrganizationModule = {
    state() {
        return {
            organization: null,
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
    },
    namespaced: true
}