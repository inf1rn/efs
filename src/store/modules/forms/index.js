import { formsAllModule } from "./formsAllModule"
import { formDetailModule } from "./formDetailModule"
import { newFormModule } from "./newFormModule"
import { formFillModule } from "./formFillModule"
import { reportsModule } from "./reports"
import { approvalModule } from "./approval"

export const formsModule = {
    modules: {
        formsAll: formsAllModule,
        formDetail: formDetailModule,
        newForm: newFormModule,
        formFill: formFillModule,
        reports: reportsModule,
        approval: approvalModule
    },
    namespaced: true
}