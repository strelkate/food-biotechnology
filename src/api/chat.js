import {baseURL, DoFetch} from "@/api/helper";

export function GetMessages(ctx, projectId, before) {
	let query = before ? '?before=' + before : ''
	let url = baseURL + '/v1/chat/messages/' + parseInt(projectId) + query
	return DoFetch(ctx, url, {
		method: 'get',
		headers: {
			"Authorization": ctx.getters.getAccessToken,
		},
	})
}

export function PostMessage(ctx, project_id, text) {
	let url = baseURL + '/v1/chat/message'
	return DoFetch(ctx, url, {
		method: 'post',
		headers: {
			"Authorization": ctx.getters.getAccessToken,
			"Content-type": "application/json",
		},
		body: JSON.stringify({project_id: project_id, text: text}),
	})
}

export function PostMessageFile(ctx, project_id, caption, file) {
	let url = baseURL + '/v1/chat/message/file'
	let body = new FormData();
	body.append('project_id', project_id);
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

export function ChatStream(token) {
	let url = 'https://avext.ru:3000' + '/v1/chat/stream?token=' + token
	url = url.replace('https://', 'wss://')
	return new WebSocket(url);
}
