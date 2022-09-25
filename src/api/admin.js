import {baseURL, DoFetch} from "@/api/helper";

export function GetStudentGroups(ctx) {
    let url = baseURL + '/v1/admin/student/groups';
    return DoFetch(ctx, url, {
        method: 'get',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
        },
    })
}

export function PostStudentGroups(ctx, name) {
	let url = baseURL + '/v1/admin/student/group';
	return DoFetch(ctx, url, {
		method: 'post',
		headers: {
			"Authorization": ctx.getters.getAccessToken,
			"Content-type": "application/json",
		},
		body: JSON.stringify({name: name}),
	})
}

export function GetStudents(ctx) {
    let url = baseURL + '/v1/admin/students';
    return DoFetch(ctx, url, {
        method: 'get',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Cache-Control": "no-cache",
        },
    })
}

export function GetStudentsProjects(ctx, ids) {
    let url = baseURL + '/v1/admin/students/projects?ids=' + ids
    return DoFetch(ctx, url, {
        method: 'get',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Cache-Control": "no-cache",
        },
    })
}
