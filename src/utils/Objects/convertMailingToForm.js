// works with notifications and mailings

import { cloneDeep } from "lodash"

export const convertMailingToForm = (notification) => {
    notification = cloneDeep(notification)
    console.log(notification.mailing_status_id)
    return {
        title: notification.title,
        theme: notification.subject,
        sendAt: new Date(notification.send_at).toISOString().slice(0, 10),
        regionId: notification.region_id,
        periodId: notification.period.id,
        formId: notification.form_id,
        roleId: notification.role_id,
        body: notification.body,
        statusId: notification.mailing_status_id,
        eventTypeId: notification.type.id,
        id: notification.id
    }
}