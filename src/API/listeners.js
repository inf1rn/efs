import { baseAPI } from "./axios";

const baseURL = "/listeners"

export const listenersAPI = {
    createListener: ({ snils, cityName, organizationName, educationLevel, positionName, educationPlace, programCategory, localityType, }) => baseAPI.post(`${baseURL}`,
        JSON.stringify({
            snils,
            "region_name": cityName,
            "organization_name": organizationName,
            "education_level": educationLevel,
            "position": positionName,
            "education_place": "educationPlace",
            "program_category": "programCategory"
        }
        )),
    uploadListenerCSV: listenerCSV => {
        const formData = new FormData()
        formData.append("file", listenerCSV)

        return baseAPI.post(`${baseURL}/upload`, formData)
    },
    fetchListeners: ({ page, perPage = 1000, regionId = "" }) => {
        return baseAPI.get(`${baseURL}?` + (page ? `page=${page}` : '') + `&per_page=${perPage}&filter[report_region_id]=${regionId}`)
    },
    // type - csv || xls
    fetchListenersExport: (type) => {
        return baseAPI.get(`${baseURL}?export=${type}`)
    },
    fetchRegionsListenersStat: () => {
        return baseAPI.get(`${baseURL}/stats`)
    }
}
