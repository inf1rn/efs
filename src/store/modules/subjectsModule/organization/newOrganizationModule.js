import { changePropertyById } from "@/utils/Objects/changePropertyById"
import _ from "lodash"
import { organizationsAPI } from "@/API/organizations"

export const newOrganizationModule = {
    state() {
        return {
            newOrganization: {
                email: "",
                title: "",
                title_short: "",
                description: "",
                phone: "",
                address: "",
                employees: [{
                    position: "Директор",
                    name: "",
                    description: "",
                    sort: 1,
                    image: null,
                    id: 1
                }],
                education_programs: [],
                region_id: null
            }
        }
    },
    getters: {
        getEmployeesBySort: (state) => (sort) => {
            return state.newOrganization.employees.filter(employee => employee.sort === sort)
        },
        getIsDisabled: (state, getters) => {
            const { employees, education_programs, region_id, ...restInfo } = state.newOrganization
            const mainEmployee = getters.getEmployeesBySort(1)
            const otherEmployees = getters.getEmployeesBySort(2)


            if (!region_id) {
                return true
            }

            for (let value of Object.values(restInfo)) {
                if (!value) {
                    return true
                }
            }

            if (!(mainEmployee[0].name && mainEmployee[0].image)) {
                return true
            }

            for (let employee of otherEmployees) {
                if (!(employee.name && employee.position)) {
                    return true
                }
            }

            for (let educationProgram of education_programs) {
                if (!(educationProgram.title || educationProgram.link)) {
                    return true
                }
            }

            return false
        }
    },
    mutations: {
        setNewOrganizationEmail(state, email) {
            state.newOrganization = {
                ...state.newOrganization,
                email
            }
        },
        setRegionId(state, regionId) {
            state.newOrganization = {
                ...state.newOrganization,
                region_id: regionId
            }
        },
        setNewOrganizationTitle(state, title) {
            state.newOrganization = {
                ...state.newOrganization,
                title
            }
        },
        setNewOrganizationTitleShort(state, titleShort) {
            state.newOrganization = {
                ...state.newOrganization,
                title_short: titleShort
            }
        },
        setNewOrganizationDescription(state, description) {
            state.newOrganization = {
                ...state.newOrganization,
                description
            }
        },
        setNewOrganizationPhone(state, phone) {
            state.newOrganization = {
                ...state.newOrganization,
                phone
            }
        },
        setNewOrganizationAddress(state, address) {
            state.newOrganization = {
                ...state.newOrganization,
                address
            }
        },
        setNewOrganizationEmployeeName(state, { name, id }) {
            state.newOrganization = {
                ...state.newOrganization,
                employees: changePropertyById(state.newOrganization.employees, id, { name }, "name")
            }
        },
        setNewOrganizationEmployeePosition(state, { position, id }) {
            state.newOrganization = {
                ...state.newOrganization,
                employees: changePropertyById(state.newOrganization.employees, id, { position }, "position")
            }
        },
        setNewOrganizationEmployeeDescription(state, { description, id }) {
            state.newOrganization = {
                ...state.newOrganization,
                employees: changePropertyById(state.newOrganization.employees, id, { description }, "description")
            }
        },
        setNewOrganizationEmployeeImg(state, { image, id }) {
            state.newOrganization = {
                ...state.newOrganization,
                employees: changePropertyById(state.newOrganization.employees, id, { image }, "image")
            }
        },
        setNewOrganizationProgramTitle(state, { title, id }) {
            state.newOrganization = {
                ...state.newOrganization,
                education_programs: changePropertyById(state.newOrganization.education_programs, id, { title }, "title")
            }
        },
        setNewOrganizationProgramLink(state, { link, id }) {
            state.newOrganization = {
                ...state.newOrganization,
                education_programs: changePropertyById(state.newOrganization.education_programs, id, { link }, "link")
            }
        },
        createNewOrganizationProgram(state, { link, title }) {
            const programs = state.newOrganization.education_programs
            const maxId = _.maxBy(programs, "id")?.id
            const newProgramId = maxId ? maxId + 1 : 1

            state.newOrganization = {
                ...state.newOrganization,
                education_programs: [{ link, title, id: newProgramId }, ...state.newOrganization.education_programs]
            }
        },
        deleteNewOrganizationProgram(state, id) {
            state.newOrganization = {
                ...state.newOrganization,
                education_programs: state.newOrganization.education_programs.filter(program => program.id != id)
            }
        },
        createNewOrganizationEmployee(state, { position, name, description, sort, image }) {
            const employees = state.newOrganization.employees
            const maxId = _.maxBy(employees, "id")?.id
            const newProgramId = maxId ? maxId + 1 : 1

            state.newOrganization = {
                ...state.newOrganization,
                employees: [{ position, name, id: newProgramId, description, sort, image }, ...state.newOrganization.employees]
            }
        }
    },
    actions: {
        async createOrganization({ state, rootState, dispatch, getters }) {
            try {
                const { data: { data: { id: organizationId } } } = await organizationsAPI.createOrganization(state.newOrganization)
                console.log(organizationId)
                const promises = [
                    organizationsAPI.uploadPrograms(organizationId, state.newOrganization.education_programs),
                    organizationsAPI.uploadEmployees(organizationId, getters.getEmployeesBySort(2)),

                ]
                console.log(getters.getEmployeesBySort(1)[0].name)
                if (getters.getEmployeesBySort(1)[0].name) {
                    promises.push(organizationsAPI.uploadEmployee(organizationId, getters.getEmployeesBySort(1)[0]))
                }
                
                await Promise.all(promises)
                alert("Организация создана")
            } catch (e) {
                alert("Ошибка")
                console.log(e)
            }

        }
    },
    namespaced: true
}