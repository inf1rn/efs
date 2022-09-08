import { required, minLength } from "@vuelidate/validators"

export const mailingEditorMixin = {
    methods: {
        getValidations() {
            return {
                title: { required, $lazy: true, minLength: minLength(5) },
                eventTypeId: { required, $lazy: true },
                theme: { required, minLength: minLength(5) },
                regionId: { $lazy: true },
                periodId: { required, $lazy: true },
                sendAt: { required, $lazy: true },
                roleId: { $lazy: true },
                body: { required, $lazy: true, minLength: minLength(5) }
            }
        }
    }
}