import { usersAPI } from "@/API/users";
import { rolesAPI } from "@/API/roles"
import { cloneDeep } from "lodash"

export const accountModule = {
    state() {
        return {
            userData: null,
            roles: []
        }
    },
    getters: {
        getRoleById: (state) => (roleId) => {
            return state.roles.find(role => role.id === roleId)
        },
        getUserRolesNames: (state) => {
            return state.userData?.roles.map(role => role.name)
        }
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData
        },
        setRoles(state, roles) {
            state.roles = roles
        }
    },
    actions: {
        async getUser({ commit }) {
            const { data: userData } = await usersAPI.fetchUser()

            commit("setUserData", userData)

            commit("profile/setFormData", cloneDeep(userData), { root: true })
            commit("auth/setAuth", true, { root: true })
        },
        async fetchRoles({ commit }) {
            const { data: { data: roles } } = await rolesAPI.fetchRoles()
            commit("setRoles", roles)
        }
    },
    namespaced: true
}