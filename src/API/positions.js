import { baseAPI } from "./axios";

const baseURL = "/positions"

export const positionsAPI = {
    fetchPositions: () => baseAPI.get(baseURL)
}