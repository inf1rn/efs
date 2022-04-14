import { cloneDeep } from "lodash"
import { usersAPI } from "@/API/users"
import { convertUserToForm } from "@/utils/Objects/convertUserToForm"

export const currentUserModule = {
    state() {
        return {
            isModalActive: false,
            currentUser: {
                form: {
                    userData: null,
                    password: {
                        newPassword: "",
                        passwordConfirm: ""
                    },
                    sendNotification: false
                },
                userData: null
            }
        }
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUser = {
                ...state.currentUser,
                userData: currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: convertUserToForm(cloneDeep(currentUser))
                }
            }
        },
        setCurrentUserFirstName(state, firstName) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        firstName
                    }
                }
            }
        },
        setCurrentUserLastName(state, lastName) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        lastName
                    }
                }
            }
        },
        setCurrentUserSecondName(state, secondName) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        secondName
                    }
                }
            }
        },
        setCurrentUserImage(state, image) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        image
                    }
                }
            }
        },
        setCurrentUserRegionId(state, regionId) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        regionId
                    }
                }
            }
        },
        setCurrentUserOrganizationId(state, organizationId) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        organizationId
                    }
                }
            }
        },
        setCurrentUserCityId(state, cityId) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        cityId
                    }
                }
            }
        },
        setCurrentUserPositionId(state, positionId) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        positionId
                    }
                }
            }
        },
        setCurrentUserSendNotification(state, sendNotification) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    sendNotification
                }
            }
        },
        setCurrentUserNewPassword(state, newPassword) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    password: {
                        ...state.currentUser.form.password,
                        newPassword
                    }
                }
            }
        },
        setCurrentUserPasswordConfirm(state, passwordConfirm) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    password: {
                        ...state.currentUser.form.password,
                        passwordConfirm
                    }
                }
            }
        },
        setCurrentUserRoles(state, roles) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        roles
                    }
                }
            }
        },
        setIsModalActive(state, isModalActive) {
            state.isModalActive = isModalActive
        },
        clearCurrentUser(state) {
            state.currentUser = {
                form: {
                    userData: null,
                    password: {
                        newPassword: "",
                        passwordConfirm: ""
                    },
                    sendNotification: false
                },
                userData: null
            }
        },
        setCurrentUserEmail(state, email) {
            state.currentUser = {
                ...state.currentUser,
                form: {
                    ...state.currentUser.form,
                    userData: {
                        ...state.currentUser.form.userData,
                        email
                    }
                }
            }
        }
    },
    actions: {
        async saveUserInfo({ state, dispatch, commit, rootState }) {
            const currentUserData = state.currentUser.form.userData
            const userId = state.currentUser.userData.id

            const userData = {
                first_name: currentUserData.firstName,
                second_name: currentUserData.secondName,
                last_name: currentUserData.lastName,
                region_id: currentUserData.regionId,
                city_id: currentUserData.cityId,
                email: currentUserData.email,
                roles: [currentUserData.roles]
            }

            if (typeof currentUserData.image === "object") {
                userData.image = currentUserData.image
            }

            await usersAPI.updateUser(userData, userId)
            dispatch("users/usersAll/getUsers", {}, { root: true })
            if (userId === rootState.account.userData.id) {
                dispatch("account/getUser", {}, { root: true })
            }
            commit("setIsModalActive", false)
            commit("clearCurrentUser")
        },
        async saveUserPassword({ commit, state, dispatch, rootState }) {
            const userId = state.currentUser.userData.id
            const image = state.currentUser.form.userData.image

            await usersAPI.updateUserPassword(state.currentUser.form.password, userId)

            if (typeof image === "object") {
                await usersAPI.updateUser({ image }, userId)

                if (userId === rootState.account.userData.id) {
                    dispatch("account/getUser", {}, { root: true })
                }
            }
            dispatch("users/usersAll/getUsers", {}, { root: true })

            commit("setIsModalActive", false)
            commit("clearCurrentUser")
        }
    },
    namespaced: true
}