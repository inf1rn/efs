import { formApprovalModule } from "./formApprovalModule";
import { formsApprovalModule } from "./formsApprovalModule";

export const approvalModule = {
    modules: {
        formsApproval: formsApprovalModule,
        formApproval: formApprovalModule
    },
    namespaced: true
}