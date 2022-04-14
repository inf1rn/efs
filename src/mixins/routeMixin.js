export const routeMixin = {
    methods: {
        checkIsAvailable(userPermissions, requiredPermissions) {
            return requiredPermissions.every(requiredPermission => userPermissions.includes(requiredPermission))
        }
    }
}