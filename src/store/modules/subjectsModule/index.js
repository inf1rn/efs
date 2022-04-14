import { regionsModule } from "./regionsModule";
import { regionInfoModule } from "./regionInfoModule";
import { organizationModule } from "./organization";

export const subjectsModule = {
    modules: {
        organizationsRegions: regionsModule,
        organizationsRegionInfo: regionInfoModule,
        organization: organizationModule
    },
    namespaced: true
}