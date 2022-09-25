<template>
	<div class="control-students">
		<div class="container">
			<div v-if="STUDENTS.length === 0" class="control-student__none">Нет добавленных студентов</div>
			<div class="students__table">
				<div v-if="STUDENTS.length > 0" class="students__header">
					<div class="students__header-group">Номер группы</div>
					<div class="students__header-name">ФИО студента</div>
					<div class="students__header-project">Прикрепленные проекты</div>
					<div class="students__header-additionally"></div>
				</div>
				<div v-if="STUDENTS.length > 0" class="students__line"></div>
				<StringStudents
					class="students__string"
					v-for="student in STUDENTS"
					:key="student.id"
					:prop_student="student"
				/>
			</div>
		</div>

	</div>
</template>

<script>
import StringStudents from "./StringStudents";
import {mapActions, mapGetters} from "vuex";

export default {
	name: "ControlStudentsTable",
	components: {StringStudents,},
	computed: {
		...mapGetters(['STUDENTS']),
	},
	methods: {
		...mapActions(['GET_STUDENTS_FROM_API']),
	},
	mounted() {
		this.GET_STUDENTS_FROM_API()
			.then(() => {
			}, err => note({
				content: err.message,
				type: 'error', //success,warn,info,error
				time: 3
			}))
	}
}
</script>

<style>
.students__table {
	display: flex;
	flex-direction: column;
	margin-top: 60px;
	margin-bottom: 60px;
}

.students__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	font-family: 'RobotoMedium', sans-serif;
	font-weight: 600;
	font-size: 16px;
	line-height: 10px;
	color: #242A35
}

.students__header-group {
	margin-left: 30px;
	min-width: 96px;
}

.students__header-name {
	min-width: 350px;
}

.students__header-project {
	min-width: 285px;
}

.students__header-additionally {
	min-width: 46px;
}

.students__line {
	width: 100%;
	height: 1px;
	background-color: rgba(36, 42, 53, 0.1);
	margin-bottom: 15px;
}

.control-student__none {
	font-weight: 300;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	margin-left: 10px;

}
</style>
