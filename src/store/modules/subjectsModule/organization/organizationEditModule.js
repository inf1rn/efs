import { changePropertyById } from "../../../../utils/Objects/changePropertyById"
import _ from "lodash"
import { organizationsAPI } from "../../../../API/organizations"

export const organizationEditModule = {
    state() {
        return {
            formOrganization: null
        }
    },
    getters: {
        getEmployeesBySort: (state) => (sort) => {
            return state.formOrganization?.employees.filter(employee => employee.sort === sort)
        }
    },
    mutations: {
        setFormOrganization(state, organization) {
            state.formOrganization = organization
        },
        setFormOrganizationEmail(state, email) {
            state.formOrganization = {
                ...state.formOrganization,
                email
            }
        },
        setFormOrganizationTitle(state, title) {
            state.formOrganization = {
                ...state.formOrganization,
                title
            }
        },
        setFormOrganizationTitleShort(state, titleShort) {
            state.formOrganization = {
                ...state.formOrganization,
                title_short: titleShort
            }
        },
        setFormOrganizationDescription(state, description) {
            state.formOrganization = {
                ...state.formOrganization,
                description
            }
        },
        setFormOrganizationPhone(state, phone) {
            state.formOrganization = {
                ...state.formOrganization,
                phone
            }
        },
        setFormOrganizationAddress(state, address) {
            state.formOrganization = {
                ...state.formOrganization,
                address
            }
        },
        setFormOrganizationEmployeeName(state, { name, id }) {
            state.formOrganization = {
                ...state.formOrganization,
                employees: changePropertyById(state.formOrganization.employees, id, { name }, "name")
            }
        },
        setFormOrganizationEmployeeDescription(state, { description, id }) {
            state.formOrganization = {
                ...state.formOrganization,
                employees: changePropertyById(state.formOrganization.employees, id, { description }, "description")
            }
        },
        setFormOrganizationEmployeeImg(state, { image, id }) {
            state.formOrganization = {
                ...state.formOrganization,
                employees: changePropertyById(state.formOrganization.employees, id, { image }, "image")
            }
        },
        setFormOrganizationEmployeePosition(state, { position, id }) {
            state.formOrganization = {
                ...state.formOrganization,
                employees: changePropertyById(state.formOrganization.employees, id, { position }, "position")
            }
        },
        setFormOrganizationProgramTitle(state, { title, id }) {
            state.formOrganization = {
                ...state.formOrganization,
                education_programs: changePropertyById(state.formOrganization.education_programs, id, { title }, "title")
            }
        },
        setFormOrganizationProgramLink(state, { link, id }) {
            state.formOrganization = {
                ...state.formOrganization,
                education_programs: changePropertyById(state.formOrganization.education_programs, id, { link }, "link")
            }
        },
        createFormOrganizationProgram(state, { link, title }) {
            const programs = state.formOrganization.education_programs
            const maxId = _.maxBy(programs, "id")?.id
            const newProgramId = maxId ? maxId + 1 : 1

            state.formOrganization = {
                ...state.formOrganization,
                education_programs: [{ link, title, id: newProgramId }, ...state.formOrganization.education_programs]
            }
        },
        deleteFormOrganizationProgram(state, id) {
            state.formOrganization = {
                ...state.formOrganization,
                education_programs: state.formOrganization.education_programs.filter(program => program.id != id)
            }
        }
    },
    actions: {
        async updateOrganization({ state, rootState, dispatch, getters }) {
            try {
                await Promise.all([
                    organizationsAPI.updateOrganization(state.formOrganization, rootState.subjects.organization.organizationId),
                    organizationsAPI.updateEmployee(rootState.subjects.organization.organizationId, getters.getEmployeesBySort(1)[0])
                ])
                alert("Обновлено")
                dispatch("subjects/organization/fetchOrganization", {}, { root: true })
            } catch (e) {
                alert("Ошибка")
                console.log(e)
            }

        }
    },
    namespaced: true
}