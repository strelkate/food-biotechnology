import {baseURL, DoFetch} from "@/api/helper";

export function GetLibraries(ctx) {
    let url = baseURL + '/v1/references';
    return DoFetch(ctx, url, {
        method: 'get',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
        },
    })
}

export function PostLibraryFile(ctx, libraryId, caption, file) {
    let url = baseURL + '/v1/reference/file'
    let body = new FormData();
    body.append('reference_id', libraryId);
    body.append('caption', caption);
    body.append('file', file);
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
        },
        body: body,
    })
}

export function DeleteLibraryFile(ctx, libraryId, fileId) {
    let url = baseURL + '/v1/reference/file';
    return DoFetch(ctx, url, {
        method: 'delete',
        headers: {
            "Authorization": ctx.getters.getAccessToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify({id: fileId, reference_id: libraryId}),
    })
}
