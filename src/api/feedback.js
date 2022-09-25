import {baseURL, DoFetch} from "@/api/helper";

export function PostFeedback(ctx, email, text) {
    let url = baseURL + '/v1/feedback'
    return DoFetch(ctx, url, {
        method: 'post',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({email:email, text:text}),
    })
}