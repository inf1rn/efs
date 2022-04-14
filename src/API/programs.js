import { baseAPI } from "./axios";

const baseURL = "/programs"

export const programsAPI = {
    fetchPrograms() {
        return baseAPI.get(`${baseURL}`)
    }
}