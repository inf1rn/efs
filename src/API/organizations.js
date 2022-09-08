import { baseAPI } from "./axios";

const baseURL = "/organizations"

export const organizationsAPI = {
    fetchOrganizations: ({ regionId = "", title = "" }) => baseAPI.get(`${baseURL}?include=employees,educationPrograms,educationProgramsCount&filter[region_id]=${regionId}&filter[title]=${title}`),
    fetchOrganizationById: organizationId => baseAPI.get(`${baseURL}/${organizationId}?include=employees,educationPrograms`),
    fetchOrganizationEmployees: organizationId => baseAPI.get(`${baseURL}/${organizationId}/employees`),
    updateOrganization(organization, organizationId) {
        return Promise.all([baseAPI.post(`${baseURL}/${organizationId}`, JSON.stringify(organization)),
        this.uploadPrograms(organizationId, organization.education_programs),
        this.uploadEmployees(organizationId, organization.employees)])
    },
    uploadPrograms: (organizationId, programs) => baseAPI.post(`/programs/bulk`, JSON.stringify(programs.map((program) => {
        program.organization_id = organizationId
        return program
    }))),
    uploadEmployees: (organizationId, employess) => {
        const formData = new FormData()
        for (let i = 0; i < employess.length; i++) {
            formData.append("", "")
        }

        return baseAPI.post(`${baseURL}/${organizationId}/employees/bulk`, JSON.stringify(employess))
    },
    uploadEmployee: (organizationId, employee) => {
        const formData = new FormData()
        for (let key of Object.keys(employee)) {
            if (!employee[key]) {
                continue
            }

            formData.append(key, employee[key])
        }

        return baseAPI.post(`${baseURL}/${organizationId}/employees`, formData)
    },
    updateEmployee: (organizationId, employee) => {
        const formData = new FormData()
        for (let key of Object.keys(employee)) {
            if (!employee[key]) {
                continue
            }

            formData.append(key, employee[key])
        }
        return baseAPI.post(`${baseURL}/${organizationId}/employees/${employee.id}`, formData)
    },
    createOrganization: (organization) => baseAPI.post(`${baseURL}`, JSON.stringify(organization)),
    deleteOrganization: (organizationId) => baseAPI.delete(`${baseURL}/${organizationId}`)
}
