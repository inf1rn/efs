import { baseAPI } from "./axios";

export const authAPI = {
    authUser: (email, password) => baseAPI.post("/auth", { email, password }),
    saveUser: (
        { email, password, passwordConfirm: confirm_password,
            role: roles, firstName: first_name, secondName: second_name, lastName: last_name,
            regionId: region_id, cityId: city_id, organizationId: organization_id, positionId: position_id, image }
    ) => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        formData.append("roles", [])
        formData.append("roles[]", roles)
        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("second_name", second_name)
        formData.append("region_id", region_id)
        formData.append("organization_id", organization_id)
        formData.append("city_id", city_id)
        formData.append("confirm_password", confirm_password)
        formData.append("position_id", position_id)
        formData.append("image", image)



        return baseAPI.post("/register",
            formData
        )
    }
}