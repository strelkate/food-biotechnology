<template>
	<div class="chat">
		<div class="chat__wrapper">
			<div class="chat__header">Чат</div>
			<form ref="scrollList" class="chat__body">
				<button
					v-if="messages.length > 0 && !loadFinished"
					class="chat__download"
					@click="loadMore"
				>Загрузить еще
				</button>
				<ChatMessage
					v-for="(message, index) in messages"
					:key="index"
					:prop_message="message"
					:prop_user_id="USER_ACCESS.id"
				/>
			</form>
		</div>
		<div class="chat__bottom">
			<input
				v-model="text"
				class="chat__input"
				placeholder="Сообщение"
				type="text"
				@keydown="onInputKeyDown"
			>
			<img
				class="chat__icon-clip"
				src="../../../public/assets/icon_clip.svg"
				@click="onClipClick"
			/>
			<input
				class="chat__button-invisible"
				ref="fileInput"
				type="file"
				accept=".doc,.docx,.xml,.xlsx,.ppt,.pptx,application/pdf,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/msword"
				@change="handleFileChange"
			/>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ChatMessage from "@/views/chat/ChatMessage";

export default {
	name: "Chat",
	components: {ChatMessage},
	props: {
		prop_project_id: {
			type: Number,
			required: true
		}
	},
	data: () => ({
		chatStream: null,
		messages: [],
		loadFinished: false,
		text: ""
	}),
	methods: {
		...mapActions(['GET_MESSAGES', 'POST_MESSAGE', 'POST_MESSAGE_FILE', 'GET_USERS_BY_IDS', 'GET_CHAT_STREAM', 'GET_USERS']),
		currentScrollHeight() {
			return this.$refs.scrollList.scrollHeight
		},
		scrollTo(height) {
			if (!height) {
				this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
				return
			}
			this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight - height
		},
		onInputKeyDown(e) {
			if (this.text.length === 0) {
				return
			}
			if (e.keyCode === 13) {
				e.preventDefault()
				this.POST_MESSAGE({project_id: this.prop_project_id, text: this.text}).then(() => {
					this.text = ""
					this.initMessages()
				}, err => {
					note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					});
				})
			}
		},
		onClipClick() {
			this.$refs.fileInput.click()
		},
		handleFileChange(e) {
			e.preventDefault()
			const file = e.target.files[0]
			if (file == null) return
			this.POST_MESSAGE_FILE({project_id: this.prop_project_id, caption: file.name, file: file})
				.then(() => {
					this.initMessages()
				}, err => {
					note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					});
				})
		},
		async initMessages() {
			this.messages = []
			this.loadFinished = false
			await this.loadMessages()
			this.scrollTo()
		},
		async initChatStream() {
			this.chatStream = await this.GET_CHAT_STREAM()
			this.chatStream.onopen = () => {
				console.log('ONLINE')
			};
			this.chatStream.onclose = () => {
				console.log('DISCONNECTED')
			};
			this.chatStream.onmessage = async (response) => {
				console.log('MESSAGE', response.data)
				let newMessage = JSON.parse(response.data)
				const scrollList = this.$refs.scrollList
				const users = await this.GET_USERS_BY_IDS([newMessage.owner_id])
				if (users.length > 0) {
					console.log('users', users[0].lastname, users[0].firstname)
					newMessage.owner = users[0]
				}
				this.messages.push(newMessage)
				scrollList.scrollTop = scrollList.scrollTop + scrollList.clientHeight
			};
		},
		async loadMessages(before) {
			await this.GET_MESSAGES({projectId: this.prop_project_id, before: before}).then(
				response => {
					let userIds = []
					response.messages.forEach(it => {
						let userId = parseInt(it.owner_id)
						if (userIds.indexOf(userId) === -1) {
							userIds.push(userId)
						}
					})
					if (userIds.length === 0) {
						// чтобы не моргало
						if (response.messages.length < 20) {
							this.loadFinished = true
						}
						return Promise.resolve()
					}
					return this.GET_USERS_BY_IDS(userIds).then(
						users => {
							response.messages.forEach(message => {
								message.owner = this.findUserById(users, message.owner_id)
								this.messages.unshift(message)
							})
							// чтобы не моргало
							if (response.messages.length < 20) {
								this.loadFinished = true
							}
						}, err => alert(err.message)// FIXME switch to custom notification
					)
				}, err => alert(err.message) // FIXME switch to custom notification
			)
		},
		async loadMore() {
			const height = this.currentScrollHeight()
			let before = new Date(this.messages[0].created_at)
			before.setTime(before.getTime() - 1)
			await this.loadMessages(before.toISOString())
			this.scrollTo(height)
		},
		findUserById(users, id) {
			for (let i = 0; i < users.length; i++) {
				if (users[i].id === id) {
					return users[i]
				}
			}
			return null
		},
	},
	computed: {
		...mapGetters(['USER_ACCESS']),
	},
	mounted() {
		if (!this.prop_project_id || this.prop_project_id === 0) {
			return
		}
		this.initMessages()
	},
	watch: {
		prop_project_id() {
			if (!this.prop_project_id || this.prop_project_id === 0) {
				return
			}
			this.initMessages()
		}
	},
	created() {
		this.initChatStream()
	},
	destroyed() {
		this.chatStream.close()
	},
}
</script>

<style>
.chat {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 500px;
	min-height: 520px;
	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid rgba(7, 70, 146, 1);
}

.chat__header {
	width: 100%;
	height: 60px;
	box-shadow: 0px 4px 10px rgba(7, 70, 146, 0.1);
	border-radius: 4px;
	padding: 16px 16px 16px 30px;
	font-family: "RobotoBold", sans-serif;
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	color: #242A35;
}

.chat__body {
	display: flex;
	flex-direction: column;
	padding: 10px 20px 10px 20px;
	height: 400px;
	overflow-y: auto;
	margin-top: 10px;
}

.chat__input {
	width: 460px;
	background: rgba(7, 70, 146, 0.1);
	border-radius: 30px;
	padding: 20px 25px;
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	border: none;
	outline: none;
	margin: 10px 20px 20px 20px;
}

.chat__input::placeholder {
	color: rgba(36, 42, 53, 0.5);
}

.chat__download {
	text-align: center;
	font-size: 12px;
	line-height: 12px;
	color: rgba(36, 42, 53, 0.5);
	margin-bottom: 15px;
	text-decoration: underline;
	border: none;
	background-color: #FFFFFF;
}

.chat__download:hover {
	color: #242A35;
}

.chat__icon-clip {
	width: 22px;
	height: 22px;
	right: 40px;
	top: 26px;
	opacity: 0.5;
	position: absolute;
}

.chat__button-invisible {
	display: none;
}

.chat__bottom {
	position: relative;
}
</style>
