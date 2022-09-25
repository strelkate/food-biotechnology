<template>
	<div v-if="isLoginModalShown" class="modal">
		<div id="modal_overlay" class="modal__overlay" @click="closeLoginModal"></div>
		<div class="modal__dialog">
			<div class="modal__title">Вход</div>
			<form class="modal__form" @submit="onLoginClick" @keypress.enter>
				<div class="modal__wrapper">
					<input
						class="input modal__input modal__input-email"
						placeholder="Логин или электронная почта"
						v-model="loginInput"
						@focus="onFocus('login')"
					>
					<span class="modal__error" v-if="loginInput_error">Введите логин</span>
				</div>
				<div class="modal__wrapper">
					<input
						type="password"
						class="input modal__input modal__input-password"
						placeholder="Пароль"
						v-model="passwordInput"
						@focus="onFocus('password')"
					>
					<span class="modal__error" v-if="passwordInput_error">Введите пароль</span>
				</div>
				<button class="button modal__button" type="submit">Войти</button>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

function NewCredentials(login, password) {
	return {login: login, password: password}
}

export default {
	name: 'ModalLogin',
	data() {
		return {
			loginInput: '',
			passwordInput: '',
			loginInput_error: '',
			passwordInput_error: ''
		}
	},
	computed: {
		...mapGetters(['isLoginModalShown'])
	},
	methods: {
		...mapActions(['login', 'closeLoginModal']),
		onFocus(type) {
			switch (type) {
				case 'login':
					this.loginInput_error = false
					break
				case 'password':
					this.passwordInput_error = false
					break
			}
		},
		onLoginClick(e) {
			e.preventDefault()
			if (this.loginInput === '') {
				this.loginInput_error = true
				return false
			}
			if (this.passwordInput === '') {
				this.passwordInput_error = true
				return false
			}
			this.login(NewCredentials(this.loginInput, this.passwordInput)).then(() => {
				this.closeLoginModal()
			}, err => {
				note({
					content: err.message,
					type: "error", //success,warn,info,error
					time: 3
				});
				console.log(err)
			})
		}

	}
}
</script>

<style>

.modal {
	display: flex;
	flex-direction: column;
}

.modal__overlay {
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

.modal__dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 478px;
	max-height: 100%;
	transform: translate(-50%, -50%);
	padding: 50px 64px;
	background-color: #FFFFFF;
	z-index: 1001;
	transition: opacity 0.2s;
	overflow: auto;
	visibility: visible;
	opacity: 1;
}

.modal__title {
	display: flex;
	justify-content: center;
	font-size: 22px;
	line-height: 25px;
	color: #242A35;
}

.modal__form {
	display: flex;
	flex-direction: column;
}

.modal__input {
	width: 100%;
	margin-bottom: 30px;
}

.modal__input-email {
	margin-top: 30px;
}

.modal__button {
	margin-bottom: 30px;
}
.modal__wrapper {
	 position: relative;
	 display: flex;
	 flex-direction: column;
	 width: 100%;
 }
.modal__error {
	 position: absolute;
	 font-size: 12px;
	 color: rgb(255, 67, 0);
	 bottom: 13px;
 }

</style>
