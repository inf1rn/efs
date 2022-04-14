import { currentUserModule } from "./currentUserModule";
import { newUserModule } from "./newUserModule";
import { usersAllModule } from "./usersAllModule";

export const usersModule = {
    modules: {
        usersAll: usersAllModule,
        newUser: newUserModule,
        currentUser: currentUserModule
    },
    namespaced: true
}