import { baseAPI } from "./axios";
const baseURL = "/logs"

export const loggingAPI = {
    fetchLoginLogs: (page) => baseAPI.get(`${baseURL}/users?per_page=10&page=${page}`),
    fetchFormLogs: (page) => baseAPI.get(`${baseURL}/forms?per_page=10&page=${page}`),
    fetchStatisticsLogs: (page) => baseAPI.get(`${baseURL}/data?per_page=10&page=${page}`)
}