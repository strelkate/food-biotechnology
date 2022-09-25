import Vue from 'vue'
import Vuex from 'vuex'
import {moduleLogin} from "./login";
import {moduleFeed} from "@/store/feed";
import {moduleProjects} from "@/store/project";
import {moduleUsers} from "@/store/user";
import {moduleLibraries} from "@/store/library";
import {moduleAdmin} from "@/store/admin";
import {moduleAccess} from "@/store/access";
import {moduleChat} from "@/store/chat";
import {moduleFeedback} from "@/store/feedback";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        admin: moduleAdmin,
        login: moduleLogin,
        feed: moduleFeed,
        project: moduleProjects,
        user: moduleUsers,
        library: moduleLibraries,
        access: moduleAccess,
        chat: moduleChat,
        feedback: moduleFeedback,
    }
})
