<template>
	<div class="string-project">
		<div class="string-project__wrapper"
			 @click="onProjectDetailsClick(prop_project)"
		>
			<div class="string-project__name">{{ prop_project.name }}</div>
			<ul class="string-project__performers">
				<li
					v-for="user in users.filter((v)=>{return v.id !== prop_project.owner_id})"
					:key="user.id"
				>
					{{ user.lastname + " " + user.firstname }}
				</li>
			</ul>
			<div class="string-project__status">{{ projectStatus }}</div>
			<div
				class="string-project__additionally"
				data-tooltip="Подробнее"
			>
				<img src="../../../public/assets/icon_3_point.svg" alt="Icon: 3 point" class="string-project__icon">
			</div>
		</div>
		<div class="string-project__line"></div>
	</div>
</template>

<script>
import {mapActions} from "vuex";
import {ProjectStatusClosed, ProjectStatusCreated, ProjectStatusInProgress, ProjectStatusReady} from "@/store/project";
import router, {PathProjectsDetails} from "@/router";

export default {
	name: "StringProject",
	props: {
		prop_project: {
			type: Object,
			required: true
		},
	},
	data: () => ({
		users: []
	}),
	mounted() {
		let userIds = [];
		this.prop_project.collaborators.forEach(collaborator => userIds.push(parseInt(collaborator.user_id)))
		if (userIds.length === 0) {
			this.users = []
			return
		}
		this.GET_USERS_BY_IDS(userIds).then(users => {
			this.users = users
		}, err => note({
			content: err.message,
			type: "error", //success,warn,info,error
			time: 3
		}))
	},
	methods: {
		...mapActions(['GET_USERS_BY_IDS']),
		onProjectDetailsClick(project) {
			if (this.$route.path === PathProjectsDetails) {
				return
			}
			router.push({path: PathProjectsDetails.replace(":id", project.id)})
		},
	},
	computed: {
		projectStatus() {
			switch (this.prop_project.status) {
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
	}
}
</script>

<style>

.string-project {
	display: flex;
	flex-direction: column;
}

.string-project__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	cursor: pointer;
}

.string-project__name {
	margin-left: 30px;
	width: 284px;
}

.string-project__performers {
	display: flex;
	flex-direction: column;
	width: 246px;
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.string-project__status {
	width: 118px;
	color: #074692;
}

.string-project__additionally {
	width: 46px;
	cursor: pointer;
	position: relative;
}

.string-project__line {
	width: 100%;
	height: 1px;
	background-color: rgba(36, 42, 53, 0.1);
	margin-bottom: 15px;
	margin-top: 15px;
}
</style>
