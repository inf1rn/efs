export const loadFileMixin = {
    methods: {
        async downloadItem({ url, label }) {
            const blob = await fetch(url).then((res) => res.blob());
            console.log(blob);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = label;
            link.click();
            URL.revokeObjectURL(link.href);
        },
    }
}