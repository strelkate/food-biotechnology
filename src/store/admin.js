import {GetStudentGroups, GetStudents, GetStudentsProjects, PostStudentGroups} from "@/api/admin";
import {GetProjects} from "@/api/project";

export const moduleAdmin = {
    state: {
        students: [],
		groups: []
    },
    getters: {
        STUDENTS(state) {
            return state.students
        },
		GROUPS(state) {
			return state.groups
		},
    },
    mutations: {
        SET_STUDENTS: (state, students) => {
            state.students = students
        },
		SET_GROUPS: (state, groups) => {
			state.groups = groups
		},
    },
    actions: {
        GET_STUDENTS_FROM_API(ctx) {
            return GetProjects(ctx).then(projects => {
                return GetStudentGroups(ctx).then(groups => {
                    return GetStudents(ctx).then((students) => {
                        let ids = []
                        students.forEach(student => {
                            ids.push(student.user_id)
                            for (let i = 0; i < groups.length; i++) {
                                if (student.group_id === groups[i].id) {
                                    student.group = groups[i]
                                    break
                                }
                            }
                        })
                        return GetStudentsProjects(ctx, ids).then(studentsProjects => {
                            students.forEach(student => {
                                for (let i = 0; i < studentsProjects.length; i++) {
                                    if (student.user_id === studentsProjects[i].user_id) {
                                        student.projects = []
                                        studentsProjects[i].projects.forEach(id => {
                                            for (let i = 0; i < projects.length; i++) {
                                                if (id === projects[i].id) {
                                                    student.projects.push(projects[i])
                                                    break
                                                }
                                            }
                                        })
                                        break
                                    }
                                }
                            })

                            ctx.commit('SET_STUDENTS', students);
                            return students
                        })
                    })
                })
            })
        },
		LOAD_STUDENT_GROUPS(ctx) {
			return GetStudentGroups(ctx).then(groups => {
				ctx.commit('SET_GROUPS', groups);
			})
		},
		ADD_STUDENT_GROUP(ctx, group) {
			return PostStudentGroups(ctx, group.name).then(()=>{
				ctx.dispatch('LOAD_STUDENT_GROUPS')
			})
		},
    },
}
