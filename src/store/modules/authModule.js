import { authAPI } from "@/API/auth";
import router from "@/router";

export const authModule = {
    state() {
        return {
            auth: false,
            loginFormData: {
                login: "",
                password: "",
            }
        }
    },
    mutations: {
        setLogin(state, login) {
            state.loginFormData = { ...state.loginFormData, login }
        },
        setPassword(state, password) {
            state.loginFormData = { ...state.loginFormData, password }
        },
        setAuth(state, auth) {
            state.auth = auth
        },
    },
    actions: {
        auth: async function ({ commit, state, dispatch }) {
            console.log(111)
            authAPI.authUser(
                state.loginFormData.login,
                state.loginFormData.password,
            )
                .then((res) => {
                    if (!res.data.data.roles.length) {
                        alert(
                            "Ваша учётная запись на модерации, в ближайшее время Администратор рассмотрит Вашу заявку"
                        );
                        return
                    }

                    const { data } = res.data
                    document.cookie = "jwt=" + data.token + ";max-age=" + 3600 * 24 * 30 + ";Path=/;";
                    document.cookie = "user_id=" + data.id + ";max-age=" + 3600 * 24 * 30 + ";Path=/;"
                    commit("setAuth", true)
                    commit("account/setUserData", data, { root: true })
                    commit("profile/setFormData", data, { root: true })
                    router.push("/cabinet")
                    dispatch("messages/messagesAll/fetchMessages", {}, { root: true })
                    dispatch("account/fetchRoles", {}, { root: true })
                })
                .catch(() => {
                    alert("Ошибка!")
                })
                .finally(() => {
                    commit("setLogin", "")
                    commit("setPassword", "")
                })
        },
        logout: function ({ commit }) {
            commit("setAuth", false)
            document.cookie = "jwt=;max-age=0;Path=/;";
            document.cookie = "user_id=;max-age=0;Path=/;"
        }
    },
    namespaced: true
}