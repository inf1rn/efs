import { usersAPI } from "@/API/users";
import { convertUserToForm } from "@/utils/Objects/convertUserToForm"

export const profileModule = {
    state() {
        return {
            formData: null,
            formPassword: {
                oldPassword: "",
                newPassword: "",
                passwordConfirm: ""
            }
        }
    },
    mutations: {
        setFormData(state, userData) {
            state.formData = convertUserToForm(userData)
        },
        setPasswordConfirm(state, passwordConfirm) {
            state.formPassword = {
                ...state.formPassword,
                passwordConfirm
            }
        },
        setNewPassword(state, newPassword) {
            state.formPassword = {
                ...state.formPassword,
                newPassword
            }
        },
        setOldPassword(state, oldPassword) {
            state.formPassword = {
                ...state.formPassword,
                oldPassword
            }
        },
        setFirstName(state, firstName) {
            state.formData = {
                ...state.formData,
                firstName
            }
        },
        setSecondName(state, secondName) {
            state.formData = {
                ...state.formData,
                secondName
            }
        },
        setLastName(state, lastName) {
            state.formData = {
                ...state.formData,
                lastName
            }
        },
        setOrganizationId(state, organizationId) {
            state.formData = {
                ...state.formData,
                organization: {
                    ...state.formData.organization,
                    organizationId
                }
            }
        },
        setPositionId(state, positionId) {
            state.formData = {
                ...state.formData,
                position: {
                    ...state.formData.position,
                    positionId
                }
            }
        }
    },
    actions: {
        setUserData({ commit }, userData) {
            commit("account/setUserData", userData, { root: true })
        },
        async saveUserData({ commit, state, dispatch, rootState }) {
            const formUserData = state.formData
            const editableUserData = {
                first_name: formUserData.firstName,
                second_name: formUserData.secondName,
                last_name: formUserData.lastName,
                position_id: formUserData.positionId,
                organization_id: formUserData.organizationId
            }
            const { data: { data: userData } } = await usersAPI.updateCurrentUser(editableUserData, rootState.account.userData.id)
            dispatch("account/getUser", {}, { root: true })

        },
        async saveUserImage({ commit, dispatch, rootState }, image) {
            const editableUserData = { image }

            const { data: { data: updatedUserData } } = await usersAPI.updateCurrentUser(editableUserData, rootState.account.userData.id)
            dispatch("account/getUser", {}, { root: true })
        },
        async changePassword({ state }) {
            if (!state.formData) {
                return
            }

            const { newPassword, passwordConfirm, oldPassword } = state.formPassword

            if (newPassword !== passwordConfirm) {
                alert("Пароли не равны")
                return
            }

            if (newPassword.length < 6) {
                alert("Длина пароля должна быть больше шести символов")
            }

            await usersAPI.updateCurrentUserPassword({ newPassword, oldPassword, passwordConfirm })
        }
    },
    namespaced: true
}