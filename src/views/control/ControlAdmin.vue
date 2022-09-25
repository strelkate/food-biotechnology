<template>
	<div class="control-admin">
		<div class="container">
			<div class="control__menu-top">
				<div class="control__name">Управление</div>
				<!--      <button class="button control-admin__button" @click="onAdminAddClick">Добавить</button>-->
				<button class="button control-admin__button-inactive">Добавить</button>
			</div>
			<div id="newNews" class="control__tabs">
				<div class="tab-admin tab__student" @click="onStudentsTableClick">
					<div class="tab__title ">Список студентов</div>
				</div>
				<div class="tab-admin tab__admin">
					<div class="tab__title tab__title-active">Администраторы</div>
					<div class="tab__line"></div>
				</div>
				<div class="tab-admin tab__news" @click="onNewsTableClick">
					<div class="tab__title">Новости</div>
				</div>
			</div>
			<div class="control-admin__none">Нет добавленных администраторов</div>
		</div>
	</div>
</template>

<script>
import router, {PathControl, PathNewsTable} from "@/router";

export default {
	name: "ControlAdmin",
	methods: {
		onAdminAddClick() {
		},
		onStudentsTableClick() {
			if (this.$route.path === PathControl) {
				return
			}
			router.push({path: PathControl})
		},
		onNewsTableClick() {
			if (this.$route.path === PathNewsTable) {
				return
			}
			router.push({path: PathNewsTable})
		}
	},
}
</script>

<style>
.control-admin__none {
	font-weight: 300;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	margin-left: 10px;
	margin-bottom: 60px;
}

.control-admin__button {
	width: 187px;
}

.control-admin__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 187px;
}

.control-admin__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.tab-admin {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 30px;
	color: #242A35;
	cursor: pointer;
}
</style>
