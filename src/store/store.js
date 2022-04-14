import { createStore } from "vuex"
import { accountModule, authModule, cabinetMapModule, formsModule, listenersModule, locationModule, loggingModule, mainPageModule, mapModule, messagesModule, newsModule, notificationsAndMailingsModule, organizationsModule, profileModule, subjectsModule, technicalSupportModule, usersModule } from "./modules"

export const store = createStore({
    state() {
        return {
            initialized: false
        }
    },
    mutations: {
        setInitialized(state, initizalized) {
            state.initialized = initizalized
        }
    },
    actions: {
        setInitialized({ commit }, initialized) {
            commit("setInitialized", initialized)
        }
    },
    modules: {
        mainPage: mainPageModule,
        news: newsModule,
        auth: authModule,
        technicalSupport: technicalSupportModule,
        location: locationModule,
        cabinetMap: cabinetMapModule,
        subjects: subjectsModule,
        account: accountModule,
        profile: profileModule,
        forms: formsModule,
        map: mapModule,
        users: usersModule,
        logging: loggingModule,
        organizations: organizationsModule,
        messages: messagesModule,
        notificationsAndMailings: notificationsAndMailingsModule,
        listeners: listenersModule
    }
})