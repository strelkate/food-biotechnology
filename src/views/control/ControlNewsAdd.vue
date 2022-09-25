<template>
	<div class="control-news-add">
		<div class="container">
			<div class="control-news-add__menu-top">
				<div class="control-news-add__name">Управление</div>
				<button class="button control-news-add__button" @click="onNewsSaveClick">Сохранить</button>
			</div>
			<div id="newNews" class="control-news-add__tabs">
				<div class="tab-news-add tab-news-add__student" @click="onStudentsTableClick">
					<div class="tab-news-add__title ">Список студентов</div>
				</div>
				<div class="tab-news-add tab-news-add__admin" @click="onAdminClick">
					<div class="tab-news-add__title">Администраторы</div>
				</div>
				<div class="tab-news-add tab-news-add__news" @click="onNewsTableClick">
					<div class="tab-news-add__title tab-news-add__title-active">Новости</div>
					<div class="tab-news-add__line"></div>
				</div>
			</div>

			<div class="control-news-add__add">
				<div class="control-news-add__title">Название новости</div>
				<input
					v-model="copy.title"
					class="control-news-add__input"
					type="text"
					placeholder="Введите название новости"
				>
				<div class="control-news-add__line"></div>

				<div class="control-news-add__title">Текст новости</div>
				<textarea
					v-model="copy.body"
					class="control-news-add__input control-news-add__textarea"
					type="text"
					placeholder="Введите текст новости"
				></textarea>
				<div class="control-news-add__line"></div>

				<div class="control-news-add__title">Прикрепленные фото</div>
				<div class="control-news-add__preview-wrapper" @click="onPlusClick">
					<img
						v-if="!!imgsrc"
						:src="imgsrc"
						class="control-news-add__preview"
					>
					<div class="control-news-add__plus">
						<img
							v-if="!imgsrc"
							src="../../../public/assets/icon_plus.png"
							alt="Icon: Plus"
							class="control-news-add__preview-icon"
						>
						<input
							class="control-news-add__button-invisible"
							ref="fileInput"
							type="file"
							accept=".png, .jpg, .jpeg"
							@change="handleFileChange"
						/>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import {mapActions} from "vuex";
import router, {PathAdmin, PathControl, PathNewsTable} from "@/router";
import {baseURL} from "@/api/helper";

function getDefaultNews() {
	return {
		title: "",
		body: "",
		img: "",
		file: null,
	}
}

export default {
	name: "ControlNewsAdd",
	data: () => ({
		copy: getDefaultNews(),
		baseURL: baseURL,
	}),
	computed: {
		imgsrc() {
			return this.copy.file ? URL.createObjectURL(this.copy.file) : !!this.copy.img ? baseURL + this.copy.img : ''
		}
	},
	methods: {
		...mapActions(['ADD_NEWS_TO_API']),
		onPlusClick() {
			this.$refs.fileInput.click()
		},
		handleFileChange(e) {
			e.preventDefault()
			const file = e.target.files[0]
			if (file == null) return
			this.copy.file = file
		},
		onNewsSaveClick() {
			if (this.copy.title.length === 0) {
				note({
					content: "<b>Заполните поле с название новости</b>",
					type: "warn", //success,warn,info,error
					time: 3
				})
				return
			}
			if (this.copy.body.length === 0) {
				note({
					content: "<b>Заполните поле с текстом новости</b>",
					type: "warn", //success,warn,info,error
					time: 3
				})
				return
			}
			if (!this.copy.file) {
				note({
					content: "<b>Прикрепите изображение для новости</b>",
					type: "warn", //success,warn,info,error
					time: 3
				})
				return
			}
			this.ADD_NEWS_TO_API({title: this.copy.title, body: this.copy.body, file: this.copy.file}).then(() => {
					this.initCopy()
					note({
						content: "<b>Новость успешно добавлена</b>",
						type: "success", //success,warn,info,error
						time: 3
					})
				},
				err => {
					note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					})
				})
		},
		onAdminClick() {
			if (this.$route.path === PathAdmin) {
				return
			}
			router.push({path: PathAdmin})
		},
		onStudentsTableClick() {
			if (this.$route.path === PathControl) {
				return
			}
			router.push({path: PathControl})
		},
		onNewsTableClick() {
			if (this.$route.path === PathNewsTable) {
				return
			}
			router.push({path: PathNewsTable})
		},
		initCopy() {
			this.copy = getDefaultNews()
		}
	},
}
</script>

<style>
.control-news-add {
	background-color: #FFFFFF;
}

.control-news-add__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	justify-content: space-between;
}

.control-news-add__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.control-news-add__button {
	width: 187px;
}

.control-news-add__tabs {
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	margin-top: 40px;
}

.tab-news-add {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 30px;
	color: #242A35;
	cursor: pointer;
}

.tab-news-add__title {
	font-size: 18px;
	line-height: 21px;
	margin-bottom: 6px;
	padding: 0 10px;
	/*opacity: 0.3;*/
}

.tab-news-add__title-active {
	opacity: 1;
}

.tab-news-add__line {
	width: 100%;
	height: 4px;
	background: #074692;
	border-radius: 4px;
}

.control-news-add__title {
	font-family: "RobotoMedium", sans-serif;
	font-weight: 600;
	font-size: 18px;
	line-height: 10px;
	color: #242A35;
	margin-bottom: 25px;
}

.control-news-add__input {
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
	margin-bottom: 5px;
	border: none;
	width: 549px;
	outline: none;
	resize: vertical;
}

.control-news-add__input::placeholder {
	color: rgba(36, 42, 53, 0.5);
}

.control-news-add__textarea {
	margin-bottom: 0;
}

.control-news-add__line {
	width: 590px;
	height: 1px;
	margin-bottom: 30px;
	background-color: rgba(36, 42, 53, 0.1);
}

.control-news-add__preview {
	height: 100%;
	width: 100%;
	object-fit: cover;
}

.control-news-add__preview-icon {
	position: absolute;
	width: 45px;
	height: 45px;
	left: 70px;
	top: 50px;
}

.control-news-add__button-invisible {
	display: none;
}

.control-news-add__preview-wrapper {
	position: relative;
	width: 185px;
	height: 145px;
	background: rgba(7, 70, 146, 0.1);
	margin-bottom: 60px;
	cursor: pointer;
}
</style>
