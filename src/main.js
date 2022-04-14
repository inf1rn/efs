import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import components from "@/components/UI"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Maska from "maska"
import title from './plugins/title'

const app = createApp(App)
components.forEach(component => {
    app.component(component.name, component)
})

app.use(Maska);

app
    .use(router)
    .use(store)
    .use(title)
    .use(
        VueTippy,
        {
            directive: 'tippy',
            component: 'tippy',
            componentSingleton: 'tippy-singleton',
            defaultProps: {
                placement: 'auto-end',
                arrow: true,
                allowHTML: true,
                trigger: "click"
            },
        }
    )
    .component("QuilEditor", QuillEditor)
    .mount("#app")
