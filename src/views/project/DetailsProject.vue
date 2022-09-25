<template>
	<div class="details-project">
		<div class="container">
			<div class="details-project__menu-top">
				<div class="details-project__menu-name">Проекты</div>
				<button class="button details-project__button" @click="onProjectBackClick">Назад</button>
			</div>
			<div class="details-project__wrapper">
				<div class="details-project__left">
					<div class="details-project__title">
						<div class="details-project__name">{{ project.name }}</div>
						<!--            <img-->
						<!--                v-if="isAccessAdmin"-->
						<!--                @click="onProjectEditClick"-->
						<!--                src="../../../public/assets/icon_3_point.svg"-->
						<!--                alt="Icon: 3 point"-->
						<!--                class="details-project__icon-point"-->
						<!--            >-->
						<img
							v-if="isAccessAdmin"
							src="../../../public/assets/icon_3_point.svg"
							alt="Icon: 3 point"
							class="details-project__icon-point"
						>
					</div>
					<div class="details-project__status">
						<div class="details-project__text">Статус</div>
						<div class="details-project__text details-project__text-link">{{ projectStatus }}</div>
					</div>
					<div class="details-project__line"></div>

					<div class="details-project__subtitle">Описание проекта</div>
					<div class="details-project__text">{{ project.description }}</div>

					<div class="details-project__subtitle">Исполнители</div>
					<ol class="details-project__collaborators">
						<li
							class="details-project__text"
							v-for="user in users.filter((v)=>{return v.id !== project.owner_id})" :key="user.id"
						>
							{{ user.lastname + " " + user.firstname }}
						</li>
					</ol>
					<div class="details-project__subtitle">Прикрепленные файлы</div>
					<a
						:href="baseUrl + file.url"
						target="_blank"
						class="details-project__file"
						v-for="(file, index) in project.files"
						:key=index
					>
						<img :src="icon(file.url)" alt="file icon" class="details-project__icon-file">
						<div class="details-project__file-name">{{ file.caption }}</div>
					</a>
				</div>
				<div class="details-project__chat">
					<Chat :prop_project_id="project.id"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chat from "@/views/chat/Chat";
import {baseURL} from "@/api/helper";
import {mapActions, mapGetters} from "vuex";
import {ProjectStatusClosed, ProjectStatusCreated, ProjectStatusInProgress, ProjectStatusReady} from "@/store/project";
import router, {PathProjects, PathProjectsEdit} from "@/router";

const regexp = /\.([0-9a-z]+$)/gi

const ignore = () => {
}

export default {
	name: "DetailsProject",
	components: {Chat},
	data() {
		return {
			baseUrl: baseURL,
			users: [],
			projectId: this.$route.params.id
		}
	},
	computed: {
		...mapGetters(['isAccessAdmin', 'PROJECT_BY_ID']),
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
	created() {
		if (this.project.id === 0) {
			this.GET_PROJECTS_FROM_API().then(ignore, ignore)
		}
	},
	methods: {
		...mapActions(['GET_USERS_BY_IDS', 'GET_PROJECTS_FROM_API']),
		onProjectBackClick() {
			if (this.$route.path === PathProjects) {
				return
			}
			router.push({path: PathProjects})
		},
		onProjectEditClick() {
			if (this.$route.path === PathProjectsEdit) {
				return
			}
			router.push({path: PathProjectsEdit.replace(":id", this.projectId)})
		},
		icon(fileURL) {
			const match = [...fileURL.matchAll(regexp)]
			switch (match[1]) {
				case "pdf":
					return "/assets/file_pdf.jpg"
				case "doc":
					return "/assets/file_xls.jpg"
				case "zip":
					return "/assets/file_zip.jpg"
				case "pptx":
					return "/assets/file_jpg.jpg"
				default:
					return "/assets/file_pdf.jpg"
			}
		}
	}
}
</script>

<style>
.details-project {
	background-color: #ffffff;
}

.details-project__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;
}

.details-project__button {
	width: 210px;
}

.details-project__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 210px;
}

.details-project__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.details-project__menu-name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.details-project__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 60px;
}

.details-project__left {
	margin-right: 90px;
	width: 100%;
	margin-top: 10px;
}

.details-project__title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;
	margin-top: 10px;
}

.details-project__name {
	font-family: 'RobotoMedium', sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 25px;
	color: #242A35;
}

.details-project__subtitle {
	font-family: 'RobotoMedium', sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 16px;
	color: #242A35;
	margin-bottom: 20px;
	margin-top: 30px;
}

.details-project__text {
	font-size: 16px;
	line-height: 19px;
	color: #242A35;
}

.details-project__status {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.details-project__text-link {
	text-decoration: underline;
}

.details-project__line {
	width: 100%;
	height: 1px;
	margin-top: 15px;
	margin-bottom: 30px;
	background-color: rgba(36, 42, 53, 0.1);
}

.details-project__collaborators {
	margin-top: 30px;
	margin-bottom: 30px;
}

.details-project__file {
	display: flex;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
	margin-bottom: 20px;
}

.details-project__icon-file {
	width: 17px;
	height: 23px;
	margin-right: 10px;
}

.details-project__icon-point {
	cursor: pointer;
}

.details-project__file-name {
	color: #242A35;
}

ol.details-project__collaborators {
	padding-left: 18px;
}

li.details-project__text {
	margin-bottom: 20px;
}

</style>
