import { loggingFormsModule } from "./loggingFormsModule";
import { loggingLoginsModule } from "./loggingLoginsModule";
import { loggingStatisticsModule } from "./loggingStatisticsModule";

export const loggingModule = {
    modules: {
        loggingLogins: loggingLoginsModule,
        loggingForms: loggingFormsModule,
        loggingStatistics: loggingStatisticsModule
    },
    namespaced: true
}