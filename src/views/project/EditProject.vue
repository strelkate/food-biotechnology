<template>
	<div class="edit-project">
		<div class="container">
			<div class="edit-project__menu-top">
				<div class="edit-project__name">Проекты</div>
				<button class="button edit-project__button" v-if="isAccessAdmin" @click="onProjectSaveClick">Сохранить
				</button>
				<button class="button edit-project__button-inactive" v-else>Сохранить</button>
			</div>
			<div class="edit-project__wrapper">
				<div class="edit-project__left">
					<div class="edit-project__title">Название проекта</div>
					<input
						class="edit-project__input"
						type="text"
						:value="project.name"
						placeholder="Ваше название проекта"
					>
					<div class="edit-project__line"></div>

					<div class="edit-project__title">Статус проекта</div>

					<select class="edit-project__select" v-model="status" @change="onChange($event)">
						<option :value="projectStatus">{{ projectStatus }}</option>
					</select>
					<!-- <img class="arrow_grey" src="../../../public/assets/arrow_grey.svg"/>-->
					<div class="edit-project__line"></div>

					<div class="edit-project__title">Количество исполнителей</div>
					<input class="edit-project__input" type="number" placeholder="0">
					<div class="edit-project__line"></div>

					<div class="edit-project__title">Описание проекта</div>
					<input class="edit-project__input" type="text" :value="project.description"
						   placeholder="Описание проекта">
					<div class="edit-project__line"></div>

					<div class="edit-project__title">Исполнитель</div>
					<!--                    <select class="edit-project__select" v-model="collaborator">-->
					<!--                      <option value disabled>Не выбран</option>-->
					<!--                      <option-->
					<!--                          v-for="user in users" :key="user.id"-->
					<!--                          :value="user"-->
					<!--                      >-->
					<!--                        {{ user.firstname }}-->
					<!--                      </option>-->
					<!--                    </select>-->

					<div class="edit-project__line"></div>

					<div class="edit-project__title">Прикрепленные файлы</div>
					<div class="edit-project__file">
						<input class="edit-project__input" placeholder="Добавить файл" ref="fileInput" type="file"
							   accept=".doc,.docx,.xml,.xlsx,.ppt,.pptx,application/pdf,-->
<!--            application/vnd.openxmlformats-officedocument.wordprocessingml.document,-->
<!--            application/msword"/>
						<img class="edit-project__icon-clip" src="../../../public/assets/icon_clip.svg"/>
					</div>
					<div class="edit-project__line"></div>
				</div>
				<div class="edit-project__chat">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {ProjectStatusClosed, ProjectStatusCreated, ProjectStatusInProgress, ProjectStatusReady} from "@/store/project";
import {mapActions, mapGetters} from "vuex";

const ignore = () => {
}

export default {
	name: "EditProject",
	data() {
		return {
			status: '',
			performers: '',
			Created: ProjectStatusCreated,
			Ready: ProjectStatusReady,
			InProgress: ProjectStatusInProgress,
			Closed: ProjectStatusClosed,
			collaborator: null,
			users: [],
			projectId: this.$route.params.id
		}
	},
	computed: {
		...mapGetters([
			'isAccessAdmin', 'PROJECT_BY_ID'
		]),
		project() {
			let project = this.PROJECT_BY_ID(this.projectId)

			let userIds = [];
			project.collaborators.forEach(collaborator => userIds.push(parseInt(collaborator.user_id)))
			if (userIds.length > 0) {
				this.GET_USERS_BY_IDS(userIds)
					.then(result => {
						this.users = result
					}, err => note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					}))
			}

			return project
		},
		projectStatus() {
			switch (this.project.status) {
				case ProjectStatusCreated:
					return "Создан"
				case ProjectStatusReady:
					return "Опубликован"
				case ProjectStatusInProgress:
					return "В работе"
				case ProjectStatusClosed:
					return "Завершен"
			}
			return ""
		}
	},
	methods: {
		...mapActions(['GET_USERS_BY_IDS', 'GET_PROJECTS_FROM_API']),
		onProjectSaveClick() {
		},
		onChange(event) {
			console.log(event.target.value)
		}
	},
	created() {
		if (this.project.id === 0) {
			this.GET_PROJECTS_FROM_API().then(ignore, ignore)
		}
	},
}
</script>

<style>
.edit-project {
	background-color: #ffffff;
}

.edit-project__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;
}

.edit-project__button {
	width: 210px;
}

.edit-project__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 210px;
}

.edit-project__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.edit-project__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.edit-project__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 60px;
}

.edit-project__left {
	/*margin-right: 90px;*/
	width: 50%;
}

.edit-project__title {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 25px;
}

.edit-project__input {
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	margin-bottom: 15px;
	border: none;
	width: 100%;
	outline: none;
}

.edit-project__input::placeholder {
	color: rgba(36, 42, 53, 0.5);
}

.edit-project__line {
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

.edit-project__file {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
}

.edit-project__icon-clip {
	width: 22px;
	height: 22px;
	margin-bottom: 15px;
	opacity: 0.5;
}
</style>
