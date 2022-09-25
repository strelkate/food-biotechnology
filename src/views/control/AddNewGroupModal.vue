<template>
	<div class="add-group">
		<div class="add-group__overlay" @click="onCloseModalGroupClick()"></div>
		<div class="add-group__dialog">
			<img class="add-group__close" @click="onCloseModalGroupClick()" src="../../../public/assets/close.svg"/>
			<h3 class="add-group__title">Добавление новой группы</h3>
			<form
				class="add-group__form"
				@submit="onSubmitCreateGroup">
				<div class="add-group__wrapper">
					<input
						v-model="name_new_group"
						type="text"
						class="input add-group__input"
						placeholder="Введите название группы"
						@focus="onFocus()"
					>
					<span class="add-group__error" v-if="name_new_group_error">Необходимо ввести название группы</span>
				</div>
				<button class="button add-group__button" type="submit">Создать</button>
			</form>
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
	name: "AddNewGroupModal",
	data() {
		return {
			name_new_group: '',
			name_new_group_error: false
		}
	},
	methods: {
		...mapActions(['ADD_STUDENT_GROUP']),
		closeModalGroupClick() {
			this.$emit('onCloseModalGroupClick')
		},
		onCloseModalGroupClick() {
			this.closeModalGroupClick()
		},
		onSubmitCreateGroup(e) {
			e.preventDefault()
			if (this.name_new_group === '') {
				this.name_new_group_error = true
				return false
			}
			this.ADD_STUDENT_GROUP({name: this.name_new_group}).then(() => {
				this.onCloseModalGroupClick()
				note({
					content: "<b>Группа успешно создана</b>",
					type: "success", //success,warn,info,error
					time: 3
				})
			}, err => note({
				content: err.message,
				type: "error", //success,warn,info,error
				time: 3
			}))
			return false
		},
		onFocus() {
			this.name_new_group_error = false
		}
	},
}
</script>

<style>
.add-group {
	display: flex;
	flex-direction: column;
}

.add-group__overlay {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.75);;
	z-index: 1000;
	visibility: visible;
	opacity: 1;
	transition: opacity 0.2s;
}

.add-group__dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 478px;
	max-height: 100%;
	transform: translate(-50%, -50%);
	padding: 50px 64px;
	background-color: #FFFFFF;
	z-index: 1001;
	visibility: visible;
	opacity: 1;
	transition: opacity 0.2s;
	overflow: auto;
}

.add-group__close {
	width: 20px;
	height: 20px;
	position: absolute;
	right: 18px;
	top: 17px;
	cursor: pointer;
}

.add-group__title {
	display: flex;
	justify-content: center;
	font-size: 22px;
	line-height: 25px;
	color: #242A35;
}

.add-group__form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.add-group__wrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
}

.add-group__input {
	width: 100%;
	margin-bottom: 30px;
}

.add-group__button {
	width: 100%;
}

.add-group__error {
	position: absolute;
	font-size: 12px;
	color: red;
	bottom: 15px;
}
</style>
