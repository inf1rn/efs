export const dateMixin = {
    methods: {
        formateDate(formatingDate, full = false) {
            const date = new Date(formatingDate).toLocaleDateString("ru-RU").slice(0, 10).replaceAll("-", ".")
            const time = new Date(formatingDate).toISOString().slice(11, 16)

            return `${date} ${full ? time : ""}`
        }
    }
}