export const translateMixin = {
    methods: {
        getFrequencyRus(frequency) {
            switch (frequency) {
                case "daily":
                    return "Ежедневно";
                case "quarterly":
                    return "Ежеквартально";
                case "monthly":
                    return "Ежемесячно";
                case "yearly":
                    return "Ежегодно";
                default:
                    return "";
            }
        }
    }
}