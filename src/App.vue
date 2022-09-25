<template>
	<div id="app">
		<div class="app">
			<div class="app__wrapper">
				<div class="app__header">
					<Header/>
				</div>
				<div class="app__menu">
					<Menu/>
				</div>
				<div class="app__router">
					<router-view style="width: 100%"/>
				</div>
			</div>
			<div class="app__footer">
				<Footer/>
			</div>
		</div>
		<ModalLogin/>
	</div>
</template>

<script>
// import Normalize from '/src/normalize.module.css';
import Normalize from '/src/normalize.module.css';
import Menu from './views/menu/Menu.vue';
import ModalLogin from "./views/home/ModalLogin.vue";
import {mapActions, mapGetters} from "vuex";
import Header from "./views/header/Header";
import Footer from "@/views/footer/Footer";

const ignore = () => {
}

export default {
	name: 'App',
	components: {
		Footer,
		Header,
		Menu,
		ModalLogin,
		Normalize,
	},
	data() {
		return {}
	},
	computed: {
		...mapGetters(['isAuthenticated', 'isAccessAdmin']),
	},
	methods: {
		...mapActions(['logout', 'GET_UPDATE_ACCESS']),
	},
	mounted() {
		if (this.isAuthenticated) {
			this.GET_UPDATE_ACCESS().then(ignore, ignore)
		}
	}
}

</script>

<style lang="scss">
html {
	scroll-behavior: smooth;
}

* {
	box-sizing: border-box;
}

@font-face {
	font-family: 'RobotoRegular', sans-serif;
	src: url("../font/roboto-regular.woff") format("woff"), url("../font/roboto-regular.woff2") format("woff2");
	font-style: normal;
	font-weight: 400;
}

@font-face {
	font-family: 'RobotoMedium', sans-serif;
	src: url("../font/roboto-medium.woff") format("woff"), url("../font/roboto-medium.woff2") format("woff2");
	font-style: normal;
	font-weight: 600;
}

@font-face {
	font-family: 'RobotoBold', sans-serif;
	src: url("../font/roboto-bold.woff") format("woff"), url("../font/roboto-bold.woff2") format("woff2");
	font-style: normal;
	font-weight: 700;
}

#app {
	font-family: 'RobotoRegular', sans-serif;
	color: #000000;
}

.app {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #242A35;
	height: 100vh;
}

img {
	max-width: 100%;
}

.container {
	max-width: 1200px;
	margin: auto;
}

.button {
	font-family: "RobotoMedium", sans-serif;
	min-height: 40px;
	padding: 13px 0;
	font-size: 18px;
	line-height: 25px;
	color: #FFFFFF;
	background-color: #074692;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	outline: none;
}

.button:hover {
	background-color: #003d80;
}

.input {
	font-size: 16px;
	line-height: 25px;
	color: #242A35;
	border: 1px solid #00000033;
	padding: 13px 0 14px 15px;
	outline: none;
}

input::placeholder {
	color: rgba(36, 42, 53, 0.3);
}

select {
	border: none;
	width: 100%;
	outline: none;
	background-color: #ffffff;
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	margin-bottom: 10px;
	cursor: pointer;
	//opacity: 0.5;
}

[data-tooltip]::after {
	content: attr(data-tooltip); /* Выводим текст */
	opacity: 0;
	pointer-events: none;
	transition: 1s;
	font-size: 14px;
	line-height: 16px;
	color: rgba(36, 42, 53, 0.5);
	position: absolute;
	top: 25px;
	left: 15px;
	z-index: 100;
}

[data-tooltip]:hover::after {
	opacity: 1;
}


//Адаптив

@media (max-width: 1200px) {
	.container {
		max-width: 960px;
	}
	.main-screen {
		align-items: flex-start;
	}
	.main-screen__image {
		max-width: 535px;
		height: 465px;
	}
	.main-screen__text {
		max-width: 403px;
	}
	.main-screen__title {
		font-size: 35px;
	}
	.main-screen__description {
		font-size: 16px;
	}
	.card-news {
		max-width: 265px;
	}

	.footer__text-col {
		width: 270px;
	}

	.details-project__wrapper {
		flex-direction: column;
	}
	.details-project__left {
		margin-bottom: 30px;
	}
	.details-project__chat {
		align-self: center;
	}

}

@media (max-width: 992px) {

	.container {
		max-width: 700px;
	}
	.navbar-menu__item {
		margin-right: 40px;
	}
	.main-screen {
		flex-direction: column;
		align-items: center;
	}
	.main-screen__image {
		max-width: 100%;
	}
	.main-screen__text {
		max-width: 100%;
	}
	.footer__text-col {
		width: 200px;
	}
	.private-office__container {
		flex-direction: column;
	}
	.personal-info {
		margin-right: 0;
		margin-bottom: 40px;
	}
}

//Всплывающие подсказки

#notes {
	position: fixed;
	top: 12px;
	right: 0;
	width: 100%;
	cursor: default;
	transition: height 0.45s ease-in-out;
	-webkit-transition: height 0.45s ease-in-out;
	pointer-events: none;
	z-index: 1001;
}

#notes .note-item {
	max-height: 12em;
	opacity: 1;
	will-change: opacity, transform;
	transition: all 0.2s linear;
	-webkit-transition: all 0.2s linear;
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	width: 50vw;
	-webkit-touch-callout: none;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	z-index: 2;
	pointer-events: auto;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-flex;
	display: -ms-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-align-content: flex-end;
	-ms-flex-line-pack: end;
	align-content: flex-end;
	-webkit-box-align: end;
	-ms-flex-align: end;
	-webkit-align-items: flex-end;
	-moz-align-items: flex-end;
	align-items: flex-end;
	-webkit-align-content: flex-end;
	-ms-flex-line-pack: end;
	align-content: flex-end;
	max-width: 20em;
	font: inherit;
	line-height: 1.25em;
	color: #fff;
	margin: 0;
	transform: translateZ(0);
	-moz-transform: translateZ(0);
	-ms-transform: translateZ(0);
	-webkit-transform: translateZ(0);
	padding: 0.75em 1em;
	margin-left: auto;
	margin-right: 20px;
	margin-top: 10px;
	border-radius: 4px;
}

@media all and (max-width: 30em) {
	#notes .note-item {
		width: 75vw;
		max-width: none;
	}
}

#notes .note-item[data-show=false] {
	pointer-events: none;
	opacity: 0 !important;
	max-height: 0 !important;
	margin-bottom: 0 !important;
}

#notes .note-item[data-type=info] {
	background-color: rgb(59, 82, 187);
}

#notes .note-item[data-type=warn] {
	background-color: rgb(255, 138, 0);
	animation: shake 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	-webkit-animation: shake 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

#notes .note-item[data-type=error] {
	background-color: rgb(255, 67, 0);
	animation: shake 0.54s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	-webkit-animation: shake 0.54s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

#notes .note-item[data-type=success] {
	background-color: rgb(0, 144, 46);
}

#notes .note-item .note-item-text {
	flex: auto;
	-webkit-flex: auto;
	-moz-flex: auto;
	-ms-flex: auto;
	padding-right: 0.5em;
	max-width: calc(100% - 1.25em);
	max-width: -webkit-calc(100% - 1.25em);
}

#notes .note-item .note-item-btn {
	width: 1.25em;
	height: 1.25em;
	cursor: pointer;
	background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTguMyw1LjcxTDE4LjMsNS43MWMtMC4zOS0wLjM5LTEuMDItMC4zOS0xLjQxLDBMMTIsMTAuNTlMNy4xMSw1LjdjLTAuMzktMC4zOS0xLjAyLTAuMzktMS40MSwwbDAsMCBjLTAuMzksMC4zOS0wLjM5LDEuMDIsMCwxLjQxTDEwLjU5LDEyTDUuNywxNi44OWMtMC4zOSwwLjM5LTAuMzksMS4wMiwwLDEuNDFoMGMwLjM5LDAuMzksMS4wMiwwLjM5LDEuNDEsMEwxMiwxMy40MWw0Ljg5LDQuODkgYzAuMzksMC4zOSwxLjAyLDAuMzksMS40MSwwbDAsMGMwLjM5LTAuMzksMC4zOS0xLjAyLDAtMS40MUwxMy40MSwxMmw0Ljg5LTQuODlDMTguNjgsNi43MywxOC42OCw2LjA5LDE4LjMsNS43MXoiLz48L3N2Zz4=) no-repeat 0 0/contain;
	transition: opacity 0.2s;
	-webkit-transition: opacity 0.2s;
}

#notes .note-item .note-item-btn:hover {
	opacity: 0.6;
}

@keyframes shake {
	10%, 90% {
		transform: translate3d(-1px, 0, 0);
		-webkit-transform: translate3d(-1px, 0, 0);
		-ms-transform: translate3d(-1px, 0, 0);
	}
	20%, 80% {
		transform: translate3d(2px, 0, 0);
		-webkit-transform: translate3d(2px, 0, 0);
		-ms-transform: translate3d(2px, 0, 0);
	}
	30%, 50%, 70% {
		transform: translate3d(-4px, 0, 0);
		-webkit-transform: translate3d(-4px, 0, 0);
		-ms-transform: translate3d(-4px, 0, 0);
	}
	40%, 60% {
		transform: translate3d(4px, 0, 0);
		-webkit-transform: translate3d(4px, 0, 0);
		-ms-transform: translate3d(4px, 0, 0);
	}
}

@-webkit-keyframes shake {
	10%, 90% {
		-webkit-transform: translate3d(-1px, 0, 0);
	}
	20%, 80% {
		-webkit-transform: translate3d(2px, 0, 0);
	}
	30%, 50%, 70% {
		-webkit-transform: translate3d(-4px, 0, 0) t;
	}
	40%, 60% {
		-webkit-transform: translate3d(4px, 0, 0);
	}
}

</style>
