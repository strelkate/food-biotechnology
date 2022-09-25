import {GetProjects} from "@/api/project";

export const ProjectStatusCreated = 0
export const ProjectStatusReady = 1
export const ProjectStatusInProgress = 2
export const ProjectStatusClosed = 3

const getDefaultProject = () => ({
    id: 0,
    name: "",
    description: "",
    collaborators: [],
    files: [],
    status: 0,
    workers: 0
})

export const moduleProjects = {
    state: {
        projects: [],
        current: getDefaultProject(),
    },
    getters: {
        PROJECTS(state) {
            return state.projects
        },
        PROJECT_BY_ID: state => id => {
            for (let i = 0; i < state.projects.length; i++) {
                if (state.projects[i].id === Number(id)) {
                    return state.projects[i]
                }
            }
            return getDefaultProject()
        },
    },
    mutations: {
        SET_PROJECTS_TO_STATE: (state, projects) => {
            state.projects = projects
            if (state.current_project_id > 0) {
                projects.every(project => {
                    if (project.id === state.current_project_id) {
                        state.current = project
                        return false
                    }
                    return true
                })
            }
        },
    },
    actions: {
        GET_PROJECTS_FROM_API(context) {
            return GetProjects(context)
                .then(projects => {
                    context.commit('SET_PROJECTS_TO_STATE', projects);
                    return projects;
                })
        },
    }
}

