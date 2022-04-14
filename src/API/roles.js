import { baseAPI } from "./axios";
const baseURL = "/roles"

export const rolesAPI = {
    fetchRoles: () => baseAPI.get(baseURL)
}