import { addNewsModule } from "./addNewsModule";
import { adminNewsAllModule } from "./adminNewsAllModule";
import { editNewsModule } from "./editNewsModule";
import { newsAllModule } from "./newsAllModule";
import { newsDetailModule } from "./newsDetailModule";

export const newsModule = {
    modules: {
        newsAll: newsAllModule,
        newsDetail: newsDetailModule,
        addNews: addNewsModule,
        adminNewsAll: adminNewsAllModule,
        editNews: editNewsModule
    },
    namespaced: true
}