import { baseAPI } from "./axios";

const baseURL = "/ads"

export const adsAPI = {
    fetchAds: () => baseAPI.get(baseURL)
}
