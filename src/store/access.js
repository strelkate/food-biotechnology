import {GetAccess} from "@/api/access";

export const RoleUser = 0
export const RoleWatcher = 1 << 1
export const RoleEditor = 1 << 3
export const RoleModerator = 1 << 5
export const RoleAdmin = 1 << 7

const getDefaultAccess = () => ({
    id: 0,
    lastname: "",
    firstname: "",
    middlename: "",
    role: RoleUser,
})

export const moduleAccess = {
    state: {
        access:
            localStorage.getItem('access') ?
                JSON.parse(localStorage.getItem('access').toString()) :
                getDefaultAccess(),
    },
    mutations: {
        SET_ACCESS(state, access) {
            localStorage.setItem('access', JSON.stringify(access))
            state.access = access
        },
        RESET_STATE(state) {
            localStorage.setItem('access', JSON.stringify(getDefaultAccess()))
            state.access = getDefaultAccess()
        },
    },
    getters: {
        isAccessAdmin: state => state.access.role > RoleUser,
        USER_ACCESS: state => state.access,
        getMyId: state => state.access.id,
    },
    actions: {
        GET_UPDATE_ACCESS(context) {
            let commit = context.commit
            return new Promise((resolve, reject) => {
                GetAccess(context).then(
                    (access) => {
                        commit('SET_ACCESS', access)
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
    },
}
