import { baseAPI } from "./axios";
const baseURL = "/forms"

export const formsAPI = {
    // isAccepted True | False
    fetchForms: ({ keyword = "", page = 1, perPage = 10, statusId = "", dateAt = "", dateTo = "" }) => baseAPI.get(`${baseURL}?include=fields,status,filledCount&filter[title]=${keyword}&page=${page}&per_page=${perPage}&filter[status_id]=${statusId}&filter[active_after]=${dateAt}&filter[active_before]=${dateTo}&sort=title`),
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
        active_end: activeDateBefore,
        status_id: 2
    })),
    fetchFormResults: (formId, { regionId = "", dateAt = "", dateTo = "" }) => baseAPI.get(`${baseURL}/${formId}/results?
        filter[region_id]=${regionId}&
        filter[created_after]=${dateAt}&
        filter[created_before]=${dateTo}`),
    sendFormResults: (formId, results) => {
        return baseAPI.post(`${baseURL}/${formId}/result`, JSON.stringify({ fields: results }))
    },
    fetchReportLogs: ({ dateAt = "", dateTo = "", page = 1, perPage = 10 }) => baseAPI.get(`${baseURL}/logs?filter[created_after]=${dateAt}&filter[created_before]=${dateTo}&page=${page}&per_page=${perPage}`),
    fetchFormStatResults: (formId, { dateAt = "", dateTo = "", isPublished = "", isAccepted = "", statusId = "" }   ) => baseAPI.get(`${baseURL}/${formId}/stats?
                                                                            include=region,createdBy,acceptedBy,createdBy.city,form&
                                                                            filter[is_accepted]=${isAccepted}&
                                                                            filter[is_published]=${isPublished}&
                                                                            filter[created_after]=${dateAt}&
                                                                            filter[created_before]=${dateTo}&
                                                                            filter[form.status_id]=${statusId}
                                                                            `),
    deleteForm: (formId) => baseAPI.delete(`${baseURL}/${formId}`),
    // type - xlsx or csv
    fetchFormResultsExport: (formId, { type, regionId = "", dateAt = "", dateTo = "" }) => baseAPI.get(`${baseURL}/${formId}/results?
    export=${type}&filter[region_id]=${regionId}&
    filter[created_after]=${dateAt}&
    filter[created_before]=${dateTo}`),
    acceptFormResults: (formId, resultId) => baseAPI.post(`${baseURL}/${formId}/results/${resultId}/accept`),
    declineFormResults: (formId, resultId, { message }) => baseAPI.post(`${baseURL}/${formId}/results/${resultId}/decline`, JSON.stringify({ message })),
    fetchNotApprovedForms: ({ keyword, perPage = 10, page }) => baseAPI.get(`${baseURL}/results/pending?filter[query]=${keyword}&per_page=${perPage}&page=${page}`),
    fetchFormResult: (formId, resultId) => baseAPI.get(`${baseURL}/${formId}/results/${resultId}`)
}