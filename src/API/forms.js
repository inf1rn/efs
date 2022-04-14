import { baseAPI } from "./axios";
const baseURL = "/forms"

export const formsAPI = {
    // isAccepted True | False
    fetchForms: ({ keyword = "", isAccepted = '' }) => baseAPI.get(`${baseURL}?include=fields,status&filter[title]=${keyword}&filter[is_accepted]=${isAccepted}`),
    fetchForm: (formId) => baseAPI.get(`${baseURL}/${formId}?include=fields,status`),
    updateForm: (formId, formData) => baseAPI.post(`${baseURL}/${formId}`, JSON.stringify(formData)),
    changeField: (formId, field) => baseAPI.post(`${baseURL}/${formId}/fields/${field.id}`, JSON.stringify(field)),
    createField: (formId, field) => baseAPI.post(`${baseURL}/${formId}/fields`, JSON.stringify(field)),
    deleteField: (formId, fieldId) => baseAPI.delete(`${baseURL}/${formId}/fields/${fieldId}`),
    createForm: ({ fields, name, frequency, activeDateFrom, activeDateBefore }) => baseAPI.post(`${baseURL}`, JSON.stringify({
        fields,
        title: name,
        frequency,
        active_start: activeDateFrom,
        active_end: activeDateBefore
    })),
    fetchFormResults: (formId, { regionId = "", dateAt = "", dateTo = "" }) => baseAPI.get(`${baseURL}/${formId}/results?
        filter[region_id]=${regionId}&
        filter[created_after]=${dateAt}&
        filter[created_before]=${dateTo}`),
    sendFormResults: (formId, results) => {
        return baseAPI.post(`${baseURL}/${formId}/result`, JSON.stringify({ fields: results }))
    },
    fetchReportLogs: ({ dateAt = "", dateTo = "" }) => baseAPI.get(`${baseURL}/logs?filter[created_after]=${dateAt}&filter[created_before]=${dateTo}`),
    fetchFormStatResults: (formId, { createdAt = "", isPublished = "", isAccepted = "" }) => baseAPI.get(`${baseURL}/${formId}/stats?
                                                                            include=region,createdBy,acceptedBy,createdBy.city&
                                                                            filters[is_accepted]=${isAccepted}&
                                                                            filters[is_published]=${isPublished}&
                                                                            filters[created_at]=${createdAt}`),
    deleteForm: (formId) => baseAPI.delete(`${baseURL}/${formId}`),
    // type - xlsx or csv
    fetchFormResultsExport: (formId, { type, regionId = "", dateAt = "", dateTo = "" }) => baseAPI.get(`${baseURL}/${formId}/results?
    export=${type}&filter[region_id]=${regionId}&
    filter[created_after]=${dateAt}&
    filter[created_before]=${dateTo}`),
    acceptFormResults: (formId, resultId = 2) => baseAPI.post(`${baseURL}/${formId}/results/${resultId}/accept`),
    declineFormResults: (formId, resultId = 2, { message }) => baseAPI.post(`${baseURL}/${formId}/results/${resultId}/decline`, JSON.stringify({ message }))
}