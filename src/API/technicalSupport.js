import { baseAPI } from "./axios"
const baseURL = "/support"

export const supportAPI = {
    sendTechnicalSupportMessage: messageData => baseAPI.post(`${baseURL}/submit`, messageData)
}