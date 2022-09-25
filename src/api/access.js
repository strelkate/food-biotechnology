import {baseURL, DoFetch} from "@/api/helper";

export function GetAccess(ctx) {
    let url = baseURL + '/v1/user/access';
    return DoFetch(ctx, url, {
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Cache-Control": "no-cache",
        }
    })
}