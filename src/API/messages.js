import { baseAPI } from "./axios";
const baseURL = "/messages"

export const messagesAPI = {
    fetchMessages: async () => baseAPI.get(`${baseURL}`),
    fetchMessageById: async messageId => baseAPI.get(`${baseURL}/${messageId}`)
}