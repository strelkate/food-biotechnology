<template>
	<div class="add-project">
		<div class="container">
			<div class="add-project__menu-top">
				<div class="add-project__name">Проекты</div>
				<button class="button add-project__button" v-if="isAccessAdmin" @click="onProjectSaveClick">Сохранить
				</button>
				<button class="button add-project__button-inactive" v-else>Сохранить</button>
			</div>
			<div class="add-project__wrapper">
				<div class="add-project__left">
					<div class="add-project__title">Название проекта</div>
					<input class="add-project__input" type="text" placeholder="Ваше название проекта">
					<div class="add-project__line"></div>

					<div class="add-project__title">Статус проекта</div>
					<select class="add-project__select" v-model="status">
						<option :value="Created">Создан</option>
						<option :value="Ready">Опубликован</option>
						<option :value="InProgress">В работе</option>
						<option :value="Closed">Завершен</option>
					</select>
					<!-- <img class="arrow_grey" src="../../../public/assets/arrow_grey.svg"/>-->
					<div class="add-project__line"></div>

					<div class="add-project__title">Количество исполнителей</div>
					<input class="add-project__input" type="number" placeholder="0">
					<div class="add-project__line"></div>

					<div class="add-project__title">Описание проекта</div>
					<input class="add-project__input" type="text" placeholder="Описание проекта">
					<div class="add-project__line"></div>

					<div class="add-project__title">Исполнитель</div>
					<select class="add-project__select" v-model="collaborator">
						<option value disabled>Не выбран</option>
						<option v-for="(student, index) in STUDENTS" :key="index" :value="student">
							{{ student.lastname + ' ' + student.firstname }}
						</option>
					</select>
					<div class="add-project__line"></div>

					<div class="add-project__title">Прикрепленные файлы</div>
					<div class="add-project__file">
						<div class="add-project__input">Добавить файл</div>
						<img class="add-project__icon-clip" src="../../../public/assets/icon_clip.svg"/>
					</div>
					<div class="add-project__line"></div>
				</div>
				<div class="add-project__chat">
					<!--          <Chat/>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chat from "@/views/chat/Chat";
import {ProjectStatusClosed, ProjectStatusCreated, ProjectStatusInProgress, ProjectStatusReady} from "@/store/project";
import {mapActions, mapGetters} from "vuex";

export default {
	name: "AddProject",
	components: {Chat},
	data: () => ({
		status: ProjectStatusCreated,
		collaborator: '',
		Created: ProjectStatusCreated,
		Ready: ProjectStatusReady,
		InProgress: ProjectStatusInProgress,
		Closed: ProjectStatusClosed,
	}),
	computed: {
		...mapGetters(['STUDENTS', 'isAccessAdmin'])
	},
	methods: {
		...mapActions(['GET_STUDENTS_FROM_API']),
		onProjectSaveClick() {
		},
	},

	created() {
		this.GET_STUDENTS_FROM_API()
	}
}
</script>

<style>
.add-project {
	background-color: #ffffff;
}

.add-project__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;
}

.add-project__button {
	width: 210px;
}

.add-project__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 210px;
}

.add-project__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.add-project__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.add-project__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 60px;
}

.add-project__left {
	/*margin-right: 90px;*/
	width: 50%;
	margin-top: 10px;
}

.add-project__title {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 25px;
}

.add-project__input {
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	margin-bottom: 15px;
	border: none;
	width: 100%;
	outline: none;
}

.add-project__input::placeholder {
	color: rgba(36, 42, 53, 0.5);
}

.add-project__line {
	width: 100%;
	height: 1px;
	margin-bottom: 30px;
	background-color: rgba(36, 42, 53, 0.1);
}

.arrow_grey {
	width: 13px;
	height: 7px;
	margin-left: 4px;
}

.add-project__file {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
}

.add-project__icon-clip {
	width: 22px;
	height: 22px;
	margin-bottom: 15px;
	opacity: 0.5;
}
</style>
