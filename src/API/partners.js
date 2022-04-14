import { baseAPI } from "./axios";
const baseURL = "/partners"

export const partnersAPI = {
    fetchPartners: () => baseAPI.get(baseURL)
}