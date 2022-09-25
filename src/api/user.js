import {baseURL, DoFetch} from "@/api/helper";

export function GetUsers(ctx, userIds) {
    let url = baseURL + '/v1/users?ids=' + userIds
    return DoFetch(ctx, url, {
        method: 'get',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
        },
    })
}

export function PostPassword(ctx, old_password, new_password) {
    let url = baseURL + '/v1/user/password/change';
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify({old_password: old_password, new_password: new_password}),
    })
}