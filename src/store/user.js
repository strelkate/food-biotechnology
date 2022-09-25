import {GetUsers} from "@/api/user";
import {PostPassword} from "../api/user";

export const moduleUsers = {
	state: {
		users: [],
	},
	getters: {
		GET_USERS(state) {
			return state.users
		}
	},
	mutations: {
		ADD_USER: (state, user) => {
			state.users.push(user)
		},
		ADD_USERS: (state, users) => {
			users.forEach(user => {
				state.users.push(user)
			})
		}
	},
	actions: {
		GET_USERS_BY_IDS(context, ids) {
			let result = []
			let missedIds = []
			ids.forEach(id => {
				const user = context.getters.GET_USERS.find(user => user.id === id)
				if (!!user) {
					result.push(user)
				} else if (missedIds.indexOf(id) === -1) {
					missedIds.push(parseInt(id))
				}
			})

			if (missedIds.length === 0) {
				return Promise.resolve(result)
			}
			return new Promise((resolve, reject) => {
				context.dispatch('GET_USERS_FROM_API', ids).then(users => {
					users.forEach(user => result.push(user))
					resolve(result)
				}, err => reject(err))
			})
		},
		GET_USERS_FROM_API(context, userIds) {
			return GetUsers(context, userIds).then(users => {
				context.commit('ADD_USERS', users);
				return users;
			})
		},
		CHANGE_PASSWORD(context, password) {
			return PostPassword(context, password.old_password, password.new_password)
		},
		ADD_USER(context, user) {
			user.id = context.state.users.length
			context.commit('ADD_USER', user)
		}
	}
}
