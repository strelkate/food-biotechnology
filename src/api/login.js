import {baseURL, DoFetch} from "@/api/helper";

export function Login(ctx, login, password) {
    let url = baseURL+"/v1/user/login"
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({login: login, password: password})
    })
}