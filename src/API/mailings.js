import { baseAPI } from "./axios";
const baseURL = "/mailings"

export const mailingsAPI = {
    fetchMailings: ({ mailingsType, roleId, regionId, sendAt }, page) => baseAPI.get(`${baseURL}?filter[mailing_type_id]=${mailingsType}&
    filter[role_id]=${roleId}&filter[send_at]=${sendAt}&filter[region_id]=${regionId}&page=${page}&per_page=${10}`),
    fetchMailingById: mailingId => baseAPI.get(`${baseURL}/${mailingId}`),
    fetchMailingFormData: () => baseAPI.get(`${baseURL}/form`),
    saveMailing: mailing => {
        const convertedMailing = {
            "subject": mailing.theme,
            "title": mailing.title,
            "body": mailing.body,
            "role_id": mailing.roleId,
            "region_id": mailing.regionId,
            "mailing_type_id": mailing.eventTypeId,
            "mailing_status_id": mailing.statusId,
            "mailing_period_id": mailing.periodId,
            "send_at": mailing.sendAt,
            "form_id": 1
        }
        return baseAPI.post(`${baseURL}`, JSON.stringify(convertedMailing))
    },
    updateMailing: mailing => {
        const convertedMailing = {
            "subject": mailing.theme,
            "title": mailing.title,
            "body": mailing.body,
            "role_id": mailing.roleId,
            "region_id": mailing.regionId,
            "mailing_type_id": mailing.eventTypeId,
            "mailing_status_id": mailing.statusId,
            "mailing_period_id": mailing.periodId,
            "send_at": mailing.sendAt,
            "form_id": 1
        }
        return baseAPI.post(`${baseURL}/${mailing.id}`, JSON.stringify(convertedMailing))
    },
    deleteMailing: mailingId => baseAPI.delete(`${baseURL}/${mailingId}`)
}