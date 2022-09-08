import { baseAPI } from "./axios"
const baseURL = "/users"

export const usersAPI = {
    fetchUser: () => baseAPI.get(`${baseURL}/current`),
    updateUser: (editableUserData, userId, notify = false) => {
        console.log(editableUserData)
        const formData = new FormData()
        for (let key in editableUserData) {
            if (editableUserData[key] == null) {
                continue
            }

            if (key === "roles") {
                formData.append("roles", [])
                console.log(editableUserData.roles);
                formData.append("roles[]", editableUserData.roles[0].id)
                continue
            }
            formData.append(key, editableUserData[key])
        }
        formData.append("notify", notify)

        return baseAPI.post(`${baseURL}/${userId}?include=roles,permissions,organization`, formData)
    },
    updateCurrentUserPassword: ({ newPassword, oldPassword, passwordConfirm }, notify) => {
        return baseAPI.post(`${baseURL}/current/password`, JSON.stringify({
            password: oldPassword, new_password: newPassword, confirm_password: passwordConfirm, notify
        }))
    },
    fetchUsers: ({ keyword, regionId, cityId, dateFrom, dateTo, roleId, currentPage }) => {
        return baseAPI.get(`${baseURL}?
            sort=first_name,second_name,last_name&
            include=roles,organization,region,city,position&
            filter[city_id]=${cityId}&filter[region_id]=${regionId}&filter[name]=${keyword}&
            filter[last_login_after]=${dateFrom}&filter[last_login_before]=${dateTo}&filter[role]=${roleId}&per_page=1000`)
    },
    updateUserPassword: ({ newPassword, passwordConfirm }, userId) => baseAPI.post(`${baseURL}/${userId}/password`,
        JSON.stringify({
            password: newPassword, confirm_password: passwordConfirm
        })
    ),
    updateCurrentUser: (editableUserData) => {
        const formData = new FormData()
        for (let key in editableUserData) {
            if (editableUserData[key] == null) {
                continue
            }

            if (key === "roles") {
                formData.append("roles", [])
                formData.append("roles[]", editableUserData.roles)
                continue
            }

            formData.append(key, editableUserData[key])
        }

        return baseAPI.post(`${baseURL}/current`, formData)
    },
    deleteUser: userId => baseAPI.delete(`${baseURL}/${userId}`)


}