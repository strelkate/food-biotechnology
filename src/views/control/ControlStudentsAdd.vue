<template>
	<div class="control-students">
		<div class="container">
			<div class="control-students__menu-top">
				<div class="control-students__name">Управление</div>
				<button class="button control-students__button" @click="onStudentsSaveClick">Сохранить</button>
			</div>
			<div id="newNews" class="control-students__tabs">
				<div class="tab tab-students__student" @click="onStudentsTableClick">
					<div class="tab-students__title tab-students__title-active">Список студентов</div>
					<div class="tab-students__line"></div>
				</div>
				<div class="tab-students tab-students__admin" @click="onAdminClick">
					<div class="tab-students__title">Администраторы</div>
				</div>
				<div class="tab-students tab-students__news" @click="onNewsTableClick">
					<div class="tab-students__title">Новости</div>
				</div>
			</div>
			<div class="control-students__add">
				<div class="control-students__title">Логин</div>
				<input v-model="login" class="control-students__input" type="text" placeholder="Введите логин студента">
				<div class="control-students__line"></div>

				<div class="control-students__title">Пароль</div>
				<input v-model="password" class="control-students__input" type="password"
					   placeholder="Введите пароль студента">
				<div class="control-students__line"></div>

				<div class="control-students__title">Повторите пароль</div>
				<input v-model="password2" class="control-students__input" type="password"
					   placeholder="Введите пароль студента еще раз">
				<div class="control-students__line"></div>

				<div class="control-students__wrapper">
					<div class="control-students__title control-students__title--group">Номер группы</div>
					<div class="control-students__plus" data-tooltip="Добавить новую группу"
						 @click="openModalGroupClick">+
					</div>
				</div>
				<select v-model="group">
					<option disabled value>Не выбрана</option>
					<option
						v-for="(group, index) in GROUPS"
						:key="index"
						:value="group"
					>
						{{ group.name }}
					</option>
				</select>
				<div class="control-students__line"></div>

				<div class="control-students__title">Фамилия</div>
				<input v-model="lastname" class="control-students__input" type="text"
					   placeholder="Введите фамилию студента">
				<div class="control-students__line"></div>

				<div class="control-students__title">Имя</div>
				<input v-model="firstname" class="control-students__input" type="text"
					   placeholder="Введите имя студента">
				<div class="control-students__line"></div>

				<div class="control-students__title">Отчество</div>
				<input v-model="middlename" class="control-students__input" type="text"
					   placeholder="Введите отчество студента">
				<div class="control-students__line"></div>

				<div class="control-students__title">Закрепленные проекты</div>
				<select v-model="project">
					<option disabled value>Не выбран</option>
					<option
						v-for="(project, index) in PROJECTS"
						:key="index"
						:value="project"
					>
						{{ project.name }}
					</option>
				</select>
				<div class="control-students__line"></div>
			</div>
		</div>
		<AddNewGroupModal v-if="isAddNewGroupModalShown" @onCloseModalGroupClick="closeModalGroupClick"/>
	</div>
</template>

<script>
import router, {PathAdmin, PathControl, PathNewsTable} from "@/router";
import {mapActions, mapGetters} from "vuex";
import AddNewGroupModal from "./AddNewGroupModal";

export default {
	name: "ControlStudentsAdd",
	components: {AddNewGroupModal},
	data: () => ({
		login: '',
		password: '',
		password2: '',
		group: '',
		lastname: '',
		firstname: '',
		middlename: '',
		project: '',
		isAddNewGroupModalShown: false
	}),
	computed: {
		...mapGetters(['GROUPS', 'PROJECTS'])
	},
	methods: {
		...mapActions(['ADD_USER', 'LOAD_STUDENT_GROUPS', 'GET_PROJECTS_FROM_API']),
		onStudentsSaveClick() {
			if (this.login.length === 0 || this.password.length === 0 || this.password2.length === 0
				|| this.group.length === 0 || this.lastname.length === 0 || this.firstname.length === 0) {
				note({
					content: "<b>Заполните все поля для добавления нового студента</b>",
					type: "warn", //success,warn,info,error
					time: 3
				})
				return
			}
			if (this.password !== this.password2) {
				note({
					content: '<b>Пароли не совпадают</b>',
					type: 'warn', //success,warn,info,error
					time: 3
				})
				return
			}
			this.ADD_USER({
				login: this.login,
				password: this.password,
				group: this.group,
				lastname: this.lastname,
				firstname: this.firstname,
				middlename: this.middlename,
				project: this.project
			}).then(() => {
				note({
					content: '<b>Студент успешно создан</b>',
					type: 'success', //success,warn,info,error
					time: 3
				})
				this.login = '';
				this.password = '';
				this.password2 = '';
				this.group = '';
				this.lastname = '';
				this.firstname = '';
				this.middlename = '';
				this.project = '';

			}, err => note({
				content: err.message,
				type: 'error', //success,warn,info,error
				time: 3
			}))
		},
		onAdminClick() {
			if (this.$route.path === PathAdmin) {
				return
			}
			router.push({path: PathAdmin})
		},
		onNewsTableClick() {
			if (this.$route.path === PathNewsTable) {
				return
			}
			router.push({path: PathNewsTable})
		},
		onStudentsTableClick() {
			if (this.$route.path === PathControl) {
				return
			}
			router.push({path: PathControl})
		},
		openModalGroupClick() {
			this.isAddNewGroupModalShown = true
		},
		closeModalGroupClick() {
			this.isAddNewGroupModalShown = false
		},
	},
	created() {
		this.LOAD_STUDENT_GROUPS().then(() => {
		}, (err) => {
			console.log(err)
		})
		this.GET_PROJECTS_FROM_API()
	}
}
</script>

<style>
.control-students {
	background-color: #FFFFFF;
}

.control-students__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
}

.control-students__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.control-students__button {
	width: 187px;
}

.control-students__tabs {
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	margin-top: 40px;
}

.control-students__wrapper {
	display: flex;
	align-items: center;
	margin-bottom: 25px;
}

.control-students__plus {
	width: 20px;
	height: 20px;
	border-radius: 50px;
	margin-left: 10px;
	color: #FFFFFF;
	background: #074692;
	padding-left: 5px;
	cursor: pointer;
	position: relative;
}

.tab-students {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 30px;
	color: #242A35;
	cursor: pointer;
}

.tab-students__title {
	font-size: 18px;
	line-height: 21px;
	margin-bottom: 6px;
	padding: 0 10px;
	/*opacity: 0.3;*/
}

.tab-students__title-active {
	opacity: 1;
}

.tab-students__line {
	width: 100%;
	height: 4px;
	background: #074692;
	border-radius: 4px;
}

.control-students__add {
	width: 590px;
}

.control-students__title {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 25px;
}

.control-students__title--group {
	margin-bottom: 0;
}

.control-students__input {
	font-size: 14px;
	line-height: 16px;
	margin-bottom: 15px;
	border: none;
	width: 100%;
	outline: none;
}

.control-students__line {
	width: 590px;
	height: 1px;
	margin-bottom: 30px;
	background-color: rgba(36, 42, 53, 0.1);
}

</style>
