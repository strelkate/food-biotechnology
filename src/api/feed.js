import {baseURL, DoFetch} from "@/api/helper";

export function GetFeed(ctx, before) {
    let url = baseURL + '/v1/feed';
        // ?limit=3before=' + before
    return DoFetch(ctx, url, {
        headers: {
            "Content-type": "application/json"
        },

    })
}

export function GetFeedUnpublished(ctx) {
    let url = baseURL + '/v1/feed-unpublished';
    // ?limit=3before=' + before
    return DoFetch(ctx, url, {
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json"
        }
    })
}

export function PostFeed(ctx, title, body) {
    let url = baseURL + '/v1/feed'
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify({title: title, body: body}),
    })
}

export function PutFeed(ctx, feed_id, title, body) {
    let url = baseURL + '/v1/feed/'+feed_id
    return DoFetch(ctx, url, {
        method: 'put',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify({title: title, body: body}),
    })
}

export function PutFeedImg(ctx, feed_id, file) {
    let url = baseURL + '/v1/feed/'+feed_id+'/img'
    let body = new FormData();
    body.append('file', file);
    return DoFetch(ctx, url, {
        method: 'put',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
        },
        body: body,
    })
}