<template>
	<div class="navbar">
		<div class="container">
			<div class="navbar__wrapper">
				<ul class="navbar-menu">
					<Button title="Главная" :path="pathHome"/>
					<Button v-if="isAuthenticated" title="Проекты" :path="pathProjects"/>
					<!--          <Button v-if="isAuthenticated" title="Проекты" :path="PathProjectsDetails"/>-->
					<Button title="Библиотека" :path="pathLibrary"/>
					<Button v-if="isAuthenticated && isAccessAdmin" title="Управление" :path="pathControl"/>
					<Button v-if="isAuthenticated" title="Личный кабинет" :path="pathLk"/>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import router, {PathControl, PathHome, PathLibrary, PathLk, PathProjects, PathProjectsDetails} from "../../router";
import Button from "@/views/menu/Button";
import {mapGetters} from "vuex";

export default {
	name: 'Menu',
	components: {Button},
	data: () => ({
		router: router,
		pathHome: PathHome,
		pathProjects: PathProjects,
		pathLibrary: PathLibrary,
		pathControl: PathControl,
		pathLk: PathLk,
		PathProjectsDetails: PathProjectsDetails
	}),
	computed: {
		...mapGetters(['isAuthenticated', 'isAccessAdmin', 'PROJECTS']),
	},
	methods: {
		onButtonClick() {
			router.push({path: this.path});
		}
	}
}
</script>

<style>

.navbar {
	position: fixed;
	margin-top: 90px;
	width: 100%;
	background-color: #074692;
	height: 60px;
	z-index: 10;
}

.navbar-menu {
	display: flex;
	flex-direction: row;
	align-items: center;
	list-style-type: none;
	padding: 16px 0 23px 0;
	margin: 0;
}

</style>
