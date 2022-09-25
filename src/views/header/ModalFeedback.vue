<template>
	<div class="modal-feedback">
		<div class="modal-feedback__overlay"></div>
		<div class="modal-feedback__dialog">
			<a href="#" class="modal-feedback__close">
				<img src="../../../public/assets/close.svg" alt="icon: close" @click="onCloseClick">
			</a>
			<h3 class="modal-feedback__title">Обратная связь</h3>
			<div class="modal-feedback__form">
				<span class="modal-feedback__subtitle">Сообщение</span>
				<textarea v-model="message" class="modal-feedback__message"></textarea>
				<span class="modal-feedback__subtitle">E-mail</span>
				<input v-model="email" type="email" class="modal-feedback__input">
				<button class="button modal-feedback__button" @click="onButtonSendClick">Отправить</button>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
	name: "ModalFeedback",
	data: () => ({
		message: "",
		email: ""
	}),
	props: {
		onCloseClick: {
			type: Function,
			required: true
		},
	},
	methods: {
		...mapActions(['POST_FEEDBACK_TO_API']),
		onButtonSendClick() {
			if (this.message.length < 10) {
				note({
					content: "<b>Сообщение не может быть менее 10 символов</b>",
					type: "warn", //success,warn,info,error
					time: 3
				});
				return
			}
			if (this.email.length === 0) {
				note({
					content: "<b>Некорректный email</b>",
					type: "warn", //success,warn,info,error
					time: 3
				});
				return
			}
			this.POST_FEEDBACK_TO_API({email: this.email, message: this.message}).then(() => {
				note({
					content: "<b>Сообщение успешно отправлено</b>",
					type: "success", //success,warn,info,error
					time: 3
				});
				this.onCloseClick()
			}, err => note({
				content: err.message,
				type: "error", //success,warn,info,error
				time: 3
			}))
		},
	}
}
</script>

<style>

.modal-feedback {
	display: flex;
	flex-direction: column;
}

.modal-feedback__overlay {
	position: fixed;
	z-index: 1000;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.75);
	visibility: visible;
	opacity: 1;
	transition: opacity 0.2s;
}

.modal-feedback__dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 478px;
	max-height: 100%;
	transform: translate(-50%, -50%);
	padding: 60px 40px;
	background-color: #FFFFFF;
	z-index: 1001;
	transition: opacity 0.2s;
	overflow: auto;
	visibility: visible;
	opacity: 1;
}

.modal-feedback__title {
	display: flex;
	justify-content: center;
	font-size: 22px;
	line-height: 25px;
	color: #242A35;
	margin-bottom: 40px;
	margin-top: 0;
}

.modal-feedback__subtitle {
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 10px;
}

.modal-feedback__message {
	border: 1px solid rgba(36, 42, 53, 0.2);
	width: 100%;
	min-height: 130px;
	margin-bottom: 30px;
	outline: none;
	resize: none;
	font-size: 16px;
	line-height: 25px;
	padding: 17px 15px;
}

.modal-feedback__input {
	border: 1px solid rgba(36, 42, 53, 0.2);
	width: 100%;
	height: 50px;
	outline: none;
	font-size: 16px;
	line-height: 25px;
	padding: 17px 15px;
	margin-bottom: 35px;
}

.modal-feedback__close {
	position: absolute;
	right: 17px;
	top: 17px;
	text-decoration: none;
	cursor: pointer;
}

.modal-feedback__form {
	display: flex;
	flex-direction: column;
}

.modal-feedback__button {
	width: 100%;
}

</style>
