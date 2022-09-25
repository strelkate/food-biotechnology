<template>
	<div class="control">
		<div class="container">
			<div class="control__menu-top">
				<div class="control__name">Управление</div>
				<button class="button control__button " @click="onStudentsAddClick">Добавить студента</button>
				<!--        <button class="button control__button-inactive">Добавить студента</button>-->
			</div>
			<div id="newNews" class="control__tabs">
				<div class="tab tab__student">
					<div class="tab__title tab__title-active">Список студентов</div>
					<div class="tab__line"></div>
				</div>
				<div class="tab tab__admin" @click="onAdminClick">
					<div class="tab__title">Администраторы</div>
				</div>
				<div class="tab tab__news" @click="onNewsTableClick">
					<div class="tab__title">Новости</div>
				</div>
			</div>
			<div>
				<ControlStudentsTable/>
			</div>
		</div>
	</div>
</template>

<script>
import ControlStudentsTable from "@/views/control/ControlStudentsTable";
import router, {PathAdmin, PathNewsTable, PathStudentsAdd} from "@/router";

export default {
	name: "Control",
	data: () => ({}),

	components: {ControlStudentsTable},
	methods: {
		onStudentsAddClick() {
			if (this.$route.path === PathStudentsAdd) {
				return
			}
			router.push({path: PathStudentsAdd})
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
	}
}
</script>


<style>
.control {
	background-color: #FFFFFF;
}

.control__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
}

.control__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.control__button {
	width: 187px;
}

.control__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 187px;
}

.control__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.control__tabs {
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	margin-top: 40px;
}

.tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 30px;
	color: #242A35;
	cursor: pointer;
}

.tab__title {
	font-size: 18px;
	line-height: 21px;
	margin-bottom: 6px;
	padding: 0 10px;
	/*opacity: 0.3;*/
}

.tab__title-active {
	opacity: 1;
}

.tab__line {
	width: 100%;
	height: 4px;
	background: #074692;
	border-radius: 4px;
}


</style>
