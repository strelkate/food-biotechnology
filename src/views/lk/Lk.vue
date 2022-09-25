<template>
	<div class="private-office">
		<div class="container">
			<div class="private-office__menu-top">
				<div class="private-office__name">Личный кабинет</div>
				<button class="button private-office__button" @click="onChangePasswordClick">Сохранить</button>
			</div>
			<div class="private-office__container">
				<div class="personal-info">
					<div class="personal-info__title">Личная информация</div>
					<div class="personal-info__table">
						<div class="personal-info__table-string">
							<div class="personal-info__key">Фамилия</div>
							<div class="personal-info__value">{{ USER_ACCESS.lastname }}</div>
						</div>
						<div class="personal-info__table-string">
							<div class="personal-info__key">Имя</div>
							<div class="personal-info__value">{{ USER_ACCESS.firstname }}</div>
						</div>
						<div class="personal-info__table-string">
							<div class="personal-info__key">Отчество</div>
							<div class="personal-info__value">{{ USER_ACCESS.middlename }}</div>
						</div>
						<div class="personal-info__table-string">
							<div class="personal-info__key">Логин</div>
							<div class="personal-info__value">{{ USER_ACCESS.login }}</div>
						</div>

					</div>
				</div>
				<div class="passwords-info">
					<!--          <div class="passwords-info__title">Смена пароля</div>-->
					<!------------------------------------------------------------------------->
					<div class="passwords-info__name">Старый пароль</div>
					<div class="passwords-info__field">
						<input
							v-model="old_password"
							class="passwords-info__input passwords-info__input-old"
							type="password"
							placeholder="Введите старый пароль"
						>
						<div
							class="passwords-info__button passwords-info__button-old"
						>
							<img src="../../../public/assets/view.svg">
						</div>
					</div>
					<div class="passwords-info__line"></div>
					<!------------------------------------------------------------------------->

					<div class="passwords-info__name">Новый пароль</div>
					<div class="passwords-info__field">
						<input
							v-model="new_password"
							class="passwords-info__input passwords-info__input-new"
							type="password"
							placeholder="Введите новый пароль"
						>
						<div
							class="passwords-info__button passwords-info__button-new"

						>
							<img src="../../../public/assets/view.svg">
						</div>
					</div>
					<div class="passwords-info__line"></div>
					<!------------------------------------------------------------------------->

					<div class="passwords-info__name">Новый пароль</div>
					<div class="passwords-info__field">
						<input
							v-model="new_password2"
							class="passwords-info__input passwords-info__input-new2"
							type="password"
							placeholder="Введите новый пароль ещë раз"
						>
						<div class="passwords-info__button passwords-info__button-new2">
							<img src="../../../public/assets/view.svg">
						</div>
					</div>
					<div class="passwords-info__line"></div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "Lk",
	data: () => ({
		old_password: '',
		new_password: '',
		new_password2: '',
	}),
	computed: {
		...mapGetters(['USER_ACCESS'])
	},
	methods: {
		...mapActions(['CHANGE_PASSWORD']),
		onChangePasswordClick() {
			if (this.old_password.length === 0 || this.new_password.length === 0 || this.new_password2.length === 0) {
				note({
					content: "<b>Заполните все поля для смены пароля</b>",
					type: "warn", //success,warn,info,error
					time: 3
				})
				return
			}
			if (this.new_password !== this.new_password2) {
				note({
					content: "<b>Новые пароли не совпадают</b>",
					type: "warn", //success,warn,info,error
					time: 3
				})
				return
			}
			this.CHANGE_PASSWORD({old_password: this.old_password, new_password: this.new_password}).then(() => {
				note({
					content: "<b>Пароль успешно изменен</b>",
					type: "success", //success,warn,info,error
					time: 3
				})
				this.old_password = "";
				this.new_password = "";
				this.new_password2 = "";

			}, err => note({
				content: err.message,
				type: "error", //success,warn,info,error
				time: 3
			}))
		},
		onShowHidePasswordOld() {
			const btn = document.querySelector('.passwords-info__button-old');
			const input = document.querySelector('.passwords-info__input-old');
			btn.addEventListener('click', (event) => {
				btn.classList.toggle('active')

				if (input.getAttribute('type') === 'password') {
					input.setAttribute('type', 'text')
				} else {
					input.setAttribute('type', 'password')
				}
			})
		},

		onShowHidePasswordNew() {
			const btn = document.querySelector('.passwords-info__button-new');
			const input = document.querySelector('.passwords-info__input-new');
			btn.addEventListener('click', (event) => {
				btn.classList.toggle('active')

				if (input.getAttribute('type') === 'password') {
					input.setAttribute('type', 'text')
				} else {
					input.setAttribute('type', 'password')
				}
			})
		},

		onShowHidePasswordNew2() {
			const btn = document.querySelector('.passwords-info__button-new2');
			const input = document.querySelector('.passwords-info__input-new2');
			btn.addEventListener('click', (event) => {
				btn.classList.toggle('active')

				if (input.getAttribute('type') === 'password') {
					input.setAttribute('type', 'text')
				} else {
					input.setAttribute('type', 'password')
				}
			})
		}
	},
	mounted() {
		this.onShowHidePasswordOld()
		this.onShowHidePasswordNew()
		this.onShowHidePasswordNew2()
	}
}
</script>

<style>
.private-office {
	background-color: #FFFFFF;
}

.private-office__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
}

.private-office__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.private-office__button {
	width: 187px;
}

.private-office__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 210px;
}

.private-office__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.private-office__container {
	margin-top: 60px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding-bottom: 60px;
}

.personal-info {
	margin-right: 290px;
}

.personal-info__title {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 30px;
}

.personal-info__table {
	display: flex;
	flex-direction: column;
}

.personal-info__table-string {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 30px;
}

.personal-info__key {
	font-size: 14px;
	line-height: 16px;
	color: #074692;
	width: 63px;
	margin-right: 100px;
}

.personal-info__value {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	color: #242A35;
}

.passwords-info {
	width: 100%;
}

/*.passwords-info__title {*/
/*  font-family: "RobotoMedium", sans-serif;*/
/*  font-weight: 600;*/
/*  font-size: 19px;*/
/*  line-height: 10px;*/
/*  color: #242A35;*/
/*  margin-bottom: 30px;*/
/*}*/

.passwords-info__name {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 25px;
}

.passwords-info__input {
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	margin-bottom: 15px;
	border: none;
	width: 100%;
	outline: none;
	background-color: #FFFFFF;
}

.passwords-info__input::placeholder {
	color: rgba(36, 42, 53, 0.3);
}

.passwords-info__line {
	width: 100%;
	height: 1px;
	margin-bottom: 30px;
	background-color: rgba(36, 42, 53, 0.1);
}

.passwords-info__field {
	position: relative;
}

.passwords-info__button {
	position: absolute;
	width: 20px;
	height: 20px;
	display: inline-block;
	right: 8px;
	cursor: pointer;
}

.passwords-info__button.active::after {
	opacity: 0;
}

.passwords-info__button::after {
	position: absolute;
	content: '';
	top: 9px;
	right: -2px;
	width: 24px;
	height: 2px;
	background: black;
	transform: rotate(45deg);
	transition: .3s all ease;
	opacity: 1;
}
</style>
