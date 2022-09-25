<template>
	<div class="project">
		<div class="container">
			<div class="project__menu-top">
				<div class="project__name">Проекты</div>
				<button class="button project__button" v-if="isAccessAdmin" @click="onProjectAddClick">Добавить проект
				</button>
				<button class="button project__button-inactive" v-else>Добавить проект</button>
				<!--        <button class="button project__button-inactive">Добавить проект</button>-->
			</div>

			<div class="project__table">
				<div class="project__header">
					<div class="project__header-name">Наименование проекта</div>
					<div class="project__header-performers">Исполнители</div>
					<div class="project__header-status">Статус проекта</div>
					<div class="project__header-additionally"></div>
				</div>
				<div class="project__line"></div>
				<div class="project__none" v-if="PROJECTS.length === 0">Нет добавленных проектов</div>
				<StringProject
					class="project__string"
					v-for="project in PROJECTS"
					:key="project.id"
					:prop_project="project"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import StringProject from "./StringProject";
import EditProject from "./EditProject";
import AddProject from "@/views/project/AddProject";
import {mapActions, mapGetters} from "vuex";
import DetailsProject from "@/views/project/DetailsProject";
import router, {PathProjectsAdd} from "@/router";

export default {
	name: "Project",
	components: {DetailsProject, EditProject, StringProject, AddProject},
	data: () => ({
		currentProject: null,
	}),
	computed: {
		...mapGetters([
			'PROJECTS',
			'isAccessAdmin'
		]),
	},
	methods: {
		...mapActions([
			'GET_PROJECTS_FROM_API'
		]),
		onProjectAddClick() {
			if (this.$route.path === PathProjectsAdd) {
				return
			}
			router.push({path: PathProjectsAdd})
		},
	},
	mounted() {
		this.GET_PROJECTS_FROM_API()
			.then(() => {
				}, err =>
					note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					})
			)
	}
}

</script>
<style>

.project {
	background-color: #FFFFFF;
}

.project__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
}

.project__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.project__search {
	display: flex;
	background: #FFFFFF;
	box-sizing: border-box;
}

.project__search-input {
	width: 716px;
	border: 1px solid #074692;
	border-radius: 4px 0 0 4px;
	/*padding: 13px 14px 14px 30px;*/
	padding-left: 30px;
	font-weight: 300;
	font-size: 18px;
	line-height: 21px;
	color: rgba(36, 42, 53, 0.6)
}

.project__search-icon {
	width: 21px;
	height: 21px;
}

.project__search-button {
	padding: 12px 15px 11px 14px;
	border: 1px solid #074692;
	border-radius: 0 4px 4px 0;
	margin-left: -1px;
	cursor: pointer;
}

.project__button {
	width: 210px;
}

.project__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 210px;
}

.project__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.project__table {
	display: flex;
	flex-direction: column;
	margin-top: 66px;
	margin-bottom: 60px;
}

.project__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	font-family: 'RobotoMedium', sans-serif;
	font-weight: 600;
	font-size: 16px;
	line-height: 12px;
	color: #242A35
}

.project__header-name {
	margin-left: 30px;
	min-width: 284px;
}

.project__header-performers {
	min-width: 246px;
}

.project__header-status {
	min-width: 118px;

}

.project__header-additionally {
	min-width: 46px;
}

.project__line {
	width: 100%;
	height: 1px;
	background-color: rgba(36, 42, 53, 0.1);
	margin-bottom: 15px;
}

.project__edit, .project__details, .project__add {
	margin-top: 40px;
	margin-bottom: 60px;
}

.project__none {
	font-weight: 300;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	margin-bottom: 160px;
	margin-top: 40px;
}

</style>
