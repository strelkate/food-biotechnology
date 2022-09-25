import {Login} from "@/api/login";
import router from "@/router";

export const moduleLogin = {
    state: {
        accessToken: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '',
        refreshToken: localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : '',
        isLoginModalShown: false,
    },
    getters: {
        isAuthenticated: state => state.accessToken.length > 0,
        getAccessToken: state => state.accessToken,
        getRefreshToken: state => state.refreshToken,
        isLoginModalShown: state => state.isLoginModalShown,
    },
    mutations: {
        login(state, tokens) {
            state.accessToken = tokens.accessToken
            state.refreshToken = tokens.refreshToken
            localStorage.setItem('access_token', tokens.accessToken)
            localStorage.setItem('refresh_token', tokens.refreshToken)
        },
        logout(state) {
            state.accessToken = ''
            state.refreshToken = ''
            localStorage.setItem('access_token', '')
            localStorage.setItem('refresh_token', '')
        },
        showLoginModal(state) {
            state.isLoginModalShown = true
        },
        closeLoginModal(state) {
            state.isLoginModalShown = false
        },
    },
    actions: {
        login(ctx, credentials) {
            return Login(ctx, credentials.login, credentials.password).then(response => {
                ctx.commit('login', {accessToken:response.access_token, refreshToken:response.refresh_token})
                ctx.dispatch('GET_UPDATE_ACCESS')
            })
        },
        logout(ctx) {
            ctx.commit('logout')
            ctx.commit('RESET_STATE')
            router.push({name: 'Home'})
        },
        showLoginModal(ctx) {
            ctx.commit('showLoginModal')
        },
        closeLoginModal(ctx) {
            ctx.commit('closeLoginModal')
        },
    },
}
