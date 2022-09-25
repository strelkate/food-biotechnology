import {GetMessages, PostMessage, PostMessageFile} from "@/api/chat";
import {ChatStream} from "../api/chat";

export const moduleChat = {
	state: {},
	getters: {},
	mutations: {},
	actions: {
		GET_MESSAGES(context, {projectId, before}) {
			return GetMessages(context, projectId, before)
		},
		POST_MESSAGE(context, msg) {
			return PostMessage(context, msg.project_id, msg.text)
		},
		POST_MESSAGE_FILE(context, msg) {
			return PostMessageFile(context, msg.project_id, msg.caption, msg.file)
		},
		GET_CHAT_STREAM(context) {
			return ChatStream(context.getters.getAccessToken)
		}
	},
}
