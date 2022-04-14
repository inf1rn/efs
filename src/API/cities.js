import { baseAPI } from "./axios";
const baseURL = "/cities"

export const citiesAPI = {
    fetchCities() {
        return baseAPI.get(baseURL)
    }
}