import axios from "axios";
import { getCookie } from "@/utils/cookie"

export const baseAPI = axios.create()

baseAPI.interceptors.request.use(config => {
    const jwt = getCookie("jwt")
    if (jwt) {
        config.headers.Authorization = "Bearer " + jwt
    }
    return config
})
baseAPI.defaults.baseURL = process.env.VUE_APP_BASE_URL
baseAPI.defaults.headers.post["Content-Type"] = "application/json"