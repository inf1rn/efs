import { baseAPI } from "./axios"

const baseURL = "form-reports"

export const reportsAPI = {
    fetchReportTemplates: () => baseAPI.get(`${baseURL}`),
    deleteReportTemplate: (reportId) => baseAPI.delete(`${baseURL}/${reportId}`),
    createReportTemplate: ({ dateAt, dateTo, formId, regionId }) => baseAPI.post(`${baseURL}`, JSON.stringify({
        title: "string",
        date_start: dateAt,
        date_end: dateTo,
        form_id: formId,
        region_id: regionId
    }))
}