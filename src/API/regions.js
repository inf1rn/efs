import { baseAPI } from "./axios"

const baseURL = "/regions"

export const regionsAPI = {

    fetchRegions: ({ keyword = "", startsWith = "" } = {}) => {
        return baseAPI.get(`${baseURL}?filter[title]=${keyword}&filter[starts_with]=${startsWith}&per_page=100`)
    },
    fetchOrganizationsByRegionId: regionId => baseAPI.get(`${baseURL}/${regionId}?include=organizations`),
    fetchRegionStat: regionId => baseAPI.get(`${baseURL}/${regionId}/stats`),
    fetchRegion: regionId => baseAPI.get(`${baseURL}/${regionId}`),
    updateRegion: (regionId, region) => baseAPI.post(`${baseURL}/${regionId}`, JSON.stringify(region))
}