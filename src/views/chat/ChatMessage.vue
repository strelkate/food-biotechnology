<template>
	<div class="chat-message">
		<div class="chat-message__wrapper">
			<div v-if="prop_message.owner_id === prop_user_id" class="chat-message__send">
				<div v-if="prop_message.text.length > 0" class="chat-message__could chat-message__could-send">
					{{ prop_message.text }}
				</div>
				<a
					v-else
					:href="baseUrl + prop_message.url"
					target="_blank"
					class="chat-message__could chat-message__could-send"
				>
					{{ prop_message.caption }}
				</a>
				<div class="chat-message__time">{{ date }}</div>
			</div>

			<div v-else class="chat-message__get">
				<div class="chat-message__name chat-message__name-get">{{ username }}</div>
				<div
					v-if="prop_message.text.length > 0"
					class="chat-message__could chat-message__could-get"
				>
					{{ prop_message.text }}
				</div>
				<a
					v-else
					:href="baseUrl + prop_message.url"
					target="_blank"
					class="chat-message__could chat-message__could-get"
				>
					{{ prop_message.caption }}
				</a>
				<div class="chat-message__time">{{ date }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {baseURL} from "@/api/helper";

export default {
	name: "ChatMessage",
	data: function () {
		return {
			baseUrl: baseURL,
		}
	},
	props: {
		prop_message: {
			type: Object,
			required: true
		},
		prop_user_id: {
			type: Number,
			required: true
		},
	},
	computed: {
		date() {
			let ts = new Date(this.prop_message.created_at)
			return ts.toLocaleDateString() + ' ' + ts.toLocaleTimeString()
		},
		username() {
			if (!this.prop_message.owner) return ''
			return this.prop_message.owner.lastname + ' ' + this.prop_message.owner.firstname
		}
	},
}
</script>

<style>
.chat-message {
	display: flex;
	flex-direction: column;
	/*justify-content: space-between;*/
	/*min-height: 520px;*/
	background: #FFFFFF;
	border-radius: 4px;
}

.chat-message__could {
	font-size: 14px;
	line-height: 16px;
	max-width: 375px;
	text-decoration: none;
}

.chat-message__time {
	font-size: 10px;
	line-height: 12px;
	color: rgba(36, 42, 53, 0.5);
	margin-bottom: 15px;
}

.chat-message__name {
	font-size: 12px;
	line-height: 14px;
	color: rgba(36, 42, 53, 0.5);
}

.chat-message__name-get {
	margin-left: 10px;
}

.chat-message__could-send {
	background: #074692;
	border-radius: 30px 30px 0 30px;
	padding: 12px 20px 12px 20px;
	color: #FFFFFF;
}

.chat-message__could-get {
	background: rgba(7, 70, 146, 0.1);
	border-radius: 30px 30px 30px 0;
	padding: 12px 20px 12px 25px;
	color: #242A35;
}

.chat-message__send {
	display: flex;
	align-items: flex-end;
	flex-direction: column;
}

.chat-message__get {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
}
</style>
