<template>
	<div class="string-student">
		<div class="string-student__wrapper">
			<div class="string-student__group">{{ prop_student.group.name }}</div>
			<div class="string-student__name">
				<div>{{ prop_student.lastname + ' ' + prop_student.firstname + ' ' + prop_student.middlename }}</div>
			</div>
			<div v-for="(project, index) in prop_student.projects"
				 :key="index"
				 class="string-student__project">{{ project.name }}
			</div>
			<div v-if="!prop_student.projects || prop_student.projects.length === 0" class="string-student__project">
				Нет
			</div>
			<div class="string-student__additionally" data-tooltip="Редактировать">
				<img src="../../../public/assets/icon_3_point.svg" alt="Icon: 3 point" class="string-student__icon">
			</div>
		</div>
		<div class="string-student__line"></div>
	</div>
</template>

<script>
export default {
	name: "StringStudents",
	props: {
		prop_student: {
			type: Object,
			required: true
		}
	}
}
</script>

<style>
.string-student__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
}

.string-student__group {
	margin-left: 30px;
	width: 106px;
}

.string-student__name {
	display: flex;
	flex-direction: column;
	width: 350px;
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.string-student__project {
	width: 285px;
	color: #074692;
}

.string-student__additionally {
	width: 46px;
	cursor: pointer;
	position: relative;
}

.string-student__line {
	width: 100%;
	height: 1px;
	background-color: rgba(36, 42, 53, 0.1);
	margin-bottom: 15px;
	margin-top: 15px;
}
</style>
