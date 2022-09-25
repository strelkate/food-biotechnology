//curl http://axesol.ru:3000/v1/feed | jq
import {GetFeed, GetFeedUnpublished, GetFeedUnpuplished, PostFeed, PutFeedImg} from "@/api/feed";
import {PutFeed} from "../api/feed";

const getDefaultNews = () => ({
    id: 0,
    title: '',
    created_at: 0,
    img: '',
    body: ''
})

export const moduleFeed = {
    state: {
        feed: [],
        current: getDefaultNews(),
        current_feed_id: localStorage.getItem('current_feed_id') ?
            parseInt(localStorage.getItem('current_feed_id')) : 0,
    },
    getters: {
        FEED(state) {
            return state.feed
        },
        CURRENT_NEWS(state) {
            return state.current
        }
    },
    mutations: {
        SET_FEED_TO_STATE: (state, feed) => {
            state.feed = feed
            if (state.current_feed_id > 0) {
                feed.every(news => {
                    if (news.id === state.current_feed_id) {
                        state.current = news
                        return false
                    }
                    return true
                })
            }
            if (state.current && state.current.id === 0 && feed.length > 0) state.current = feed[0]
        },
        SET_CURRENT_NEWS: (state, news) => {
            state.current = news
            state.current_feed_id = news.id
            localStorage.setItem('current_feed_id', news.id)
        }
    },
    actions: {
        GET_FEED_FROM_API(ctx) {
            return GetFeed(ctx)
                .then((feed) => {
                    ctx.commit('SET_FEED_TO_STATE', feed.feed);
                    return feed;
                })
        },
        SET_CURRENT_NEWS({commit}, news) {
            commit('SET_CURRENT_NEWS', news);
        },
        GET_UNPUBLISHED_FEED_FROM_API(ctx) {
            return GetFeedUnpublished(ctx)
        },
        ADD_NEWS_TO_API(ctx, {title, body, file}) {
            return PostFeed(ctx, title, body).then(news => {
                return PutFeedImg(ctx, news.id, file).then(()=>{
                    ctx.dispatch('GET_FEED_FROM_API')
                })
            })
        },
        EDIT_NEWS_TO_API(ctx, {feed_id, title, body, file}) {
            return PutFeed(ctx, feed_id, title, body).then(() => {
                if (!file) {
                    return Promise.resolve()
                }
                return PutFeedImg(ctx, feed_id, file).then(()=>{
                    ctx.dispatch('GET_FEED_FROM_API')
                })
            })
        }
    },
}
