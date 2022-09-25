import {baseURL, DoFetch} from "@/api/helper";

export function GetProjects(ctx) {
    let url = baseURL + '/v1/projects';
    return DoFetch(ctx, url, {
        method: 'get',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
        },
    })
}

export function PostProject(ctx, project) {
    let url = baseURL + '/v1/project';
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify(project),
    })
}

export function PutProject(ctx, project) {
    let url = baseURL + '/v1/project';
    return DoFetch(ctx, url, {
        method: 'put',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify(project),
    })
}

export function PostProjectCollaborator(ctx, projectCollaborator) {
    let url = baseURL + '/v1/project/collaborator'
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify(projectCollaborator),
    })
}