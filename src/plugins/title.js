function getTitle(vm) {
    const title = vm.title || vm.$options.title || "NEED TO SET TITLE"
    if (title !== "NEED TO SET TITLE" && document.title !== title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

function setTitle(vm) {
    const title = getTitle(vm)
    if (title) {
        document.title = title
    }
}

export default {
    install: (app, options) => {
        app.mixin({
            created() {
                setTitle(this)
            },

            updated() {
                setTitle(this)
            }
        })
    }
}