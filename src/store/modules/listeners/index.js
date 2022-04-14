import { listenersAllModule } from "./listenersAllModule";
import { newListenerModule } from "./newListenerModule";
import { regionListenersModule } from "./regionListenersModule";
import { regionsListenersStatModule } from "./regionsListenersStatModule";

export const listenersModule = {
    modules: {
        newListener: newListenerModule,
        listenersAll: listenersAllModule,
        regionsListenersStat: regionsListenersStatModule,
        regionListeners: regionListenersModule
    },
    namespaced: true
}