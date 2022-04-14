import { messagesAPI } from "@/API/messages"

export const messagesAllModule = {
    state() {
        return {
            messages: [],
            currentMessage: {
                id: null,
                data: null
            }
        }
    },
    getters: {
        getNotOpenedMessagesCount(state) {
            return state.messages.filter(message => !message.opened).length
        }
    },
    mutations: {
        setMessages(state, messages) {
            state.messages = messages
        },
        setCurrentMessageId(state, currentMessageId) {
            state.currentMessage = {
                ...state.currentMessage,
                id: currentMessageId
            }
        },
        setCurrentMessageData(state, data) {
            state.currentMessage = {
                ...state.currentMessage,
                data
            }
        }
    },
    actions: {
        async fetchMessages({ commit }) {
            const { data: { data: { data: messages } } } = await messagesAPI.fetchMessages()
            commit("setMessages", messages)
        },
        async fetchMessageById({ commit, state, dispatch }) {
            const { data: { data: message } } = await messagesAPI.fetchMessageById(state.currentMessage.id)
            commit("setCurrentMessageData", message)
            dispatch("fetchMessages")
        }
    },
    namespaced: true
}