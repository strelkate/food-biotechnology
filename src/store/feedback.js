import {PostFeedback} from "@/api/feedback";

export const moduleFeedback = {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        POST_FEEDBACK_TO_API(ctx, msg) {
            return PostFeedback(ctx, msg.email, msg.message)
        }
    },
}
