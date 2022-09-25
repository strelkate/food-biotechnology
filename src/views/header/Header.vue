<template>
	<div class="header">
		<div class="container">
			<div class="header__container">
				<div class="header__container-left">
					<img src="../../../src/assets/logo.svg" alt="Logo" class="header__logo">
					<img src="../../../public/assets/logo_sponsor.png" alt="Logo: sponsor" class="header__logo-sponsor">
				</div>
				<div class="header__container-right">
					<!--         <img class="header__icon-letter" src="../../../public/assets/icon_letter.svg" @click="onSendFeedbackClick">-->
					<div class="header__show-modal-login" @click="onButtonLoginClick">
						{{ this.isAuthenticated ? 'Выйти' : 'Войти' }}
					</div>
				</div>
				<ModalFeedback v-if="isModalFeedbackShown" :onCloseClick="closeFeedbackModal"/>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ModalFeedback from "@/views/header/ModalFeedback";

export default {
	name: 'Header',
	components: {ModalFeedback},
	data() {
		return {
			isModalFeedbackShown: false
		}
	},
	computed: {
		...mapGetters(['isAuthenticated']),
	},
	methods: {
		...mapActions(['logout', 'showLoginModal']),
		onButtonLoginClick() {
			if (this.isAuthenticated) {
				this.logout()
			} else {
				this.showLoginModal()
			}
		},
		onSendFeedbackClick() {
			this.showFeedbackModal()
		},
		showFeedbackModal() {
			this.isModalFeedbackShown = true
		},
		closeFeedbackModal() {
			this.isModalFeedbackShown = false
		},
	}
}
</script>

<style>
.header {
	width: 100%;
	position: fixed;
	background-color: #FFFFFF;
	z-index: 11;
}

.header__container {
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	color: #000000;
}

.header__container-left {
	display: flex;
	align-items: center;
}

.header__logo {
	margin-right: 9px;
	width: 168px;
	height: 50px;
}

.header__logo-sponsor {
	width: 127px;
	height: 36px;
}

.header__container-right {
	display: flex;
	align-items: center;
}

.header__icon-letter {
	height: 25px;
	width: 25px;
	cursor: pointer;
}

.header__show-modal-login {
	cursor: pointer;
	margin-left: 34px;
}
</style>
