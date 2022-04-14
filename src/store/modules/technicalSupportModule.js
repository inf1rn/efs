import { supportAPI } from "@/API/technicalSupport"

export const technicalSupportModule = {
    state() {
        return {
            technicalSupportFormData: {
                firstName: "",
                lastName: "",
                thirdName: "",
                email: "",
                question: ""
            },
            isOpened: false
        }
    },
    mutations: {
        setLastName(state, lastName) {
            state.technicalSupportFormData = {
                ...state.technicalSupportFormData,
                lastName
            }

        },
        setFirstName(state, firstName) {
            state.technicalSupportFormData = {
                ...state.technicalSupportFormData,
                firstName: firstName
            }
        }
        ,
        setThirdName(state, thirdName) {
            state.technicalSupportFormData = {
                ...state.technicalSupportFormData,
                thirdName
            }

        },
        setEmail(state, email) {
            state.technicalSupportFormData = {
                ...state.technicalSupportFormData,
                email
            }

        },
        setQuestion(state, question) {
            state.technicalSupportFormData = {
                ...state.technicalSupportFormData,
                question
            }
        },
        setIsOpened(state, isOpened) {
            state.isOpened = isOpened
        },
        clearTechnicalSupportFormData(state) {
            state.technicalSupportFormData = {
                ...state.technicalSupportFormData,
                firstName: "",
                lastName: "",
                thirdName: "",
                email: "",
                question: ""
            }
        }
    },
    actions: {
        async sendQuestion({ commit, state }) {
            const { firstName, lastName, thirdName, email, question } = state.technicalSupportFormData
            supportAPI.sendTechnicalSupportMessage({
                first_name: firstName,
                second_name: lastName,
                last_name: thirdName,
                email: email,
                question: question
            }).then(() => {
                alert("Сообщение отправлено в тех. поддержку")
            }).finally(() => {
                commit("clearTechnicalSupportFormData")
                commit("setIsOpened", false)
            })
        }
    },
    namespaced: true
}