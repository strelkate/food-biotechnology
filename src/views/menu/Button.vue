<template>
	<div class="navbar-menu__item">
		<span @click="onButtonClick" class="navbar-menu__button">{{ this.title }}</span></div>
</template>

<script>
import router from "../../router";

export default {
	name: 'Button',
	props: {
		path: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		router: router,
	}),
	computed: {
		active() {
			return this.$route.path === this.path
		}
	},
	methods: {
		onButtonClick() {
			if (this.active) return;
			router.push({path: this.path})

		}
	}
}

</script>

<style>

.navbar-menu__button {
	font-size: 18px;
	line-height: 21px;
	color: #FFFFFF;
	cursor: pointer;
	/*font-weight: 400;*/
}

.navbar-menu__button:hover {
	text-decoration: underline;
}

.navbar-menu__item {
	margin-right: 60px;
}

</style>
