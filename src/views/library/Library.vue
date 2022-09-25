<template>
	<div class="library">
		<div class="library__rectangle">
			<div class="container">
				<div class="library__menu-top">
					<div class="library__name">Библиотека</div>
					<div class="library__search">
						<input disabled type="text" class="input library__search-input" placeholder="Поиск">
						<div class="library__search-button">
							<img src="../../../public/assets/icon_search.svg" alt="Icon: Search"
								 class="library__search-icon">
						</div>
					</div>
					<button class="button library__button" v-if="isAccessAdmin" @click="onButtonAddClick">Добавить
						файл
					</button>
					<button class="button library__button-inactive" v-else>Добавить файл</button>
					<input class="library__button-invisible" ref="fileInput" type="file" accept=".doc,.docx,.xml,.xlsx,.ppt,.pptx,application/pdf,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/msword" @change="handleFileChange"/>
				</div>
				<div class="library__directory">
					<DirectoryLibrary
						v-for="(library, index) in LIBRARIES"
						:key=index
						:directory_data="library"
						:onClickCallback="onDirectoryClick"
						:current_directory="current"
					/>
				</div>
			</div>
		</div>
		<div class="library__container">
			<div class="container">
				<div class="library__title">{{ current.name }}</div>
				<StringLibrary
					v-for="(file, index) in current.files"
					:file_data="file"
					:libraryId="current.id"
					:key=index
					class="card"
				/>
			</div>
		</div>
	</div>

</template>

<script>
import StringLibrary from "./StringLibrary";
import DirectoryLibrary from "@/views/library/DirectoryLibrary";
import {mapActions, mapGetters} from "vuex";

export default {
	name: "Library",
	components: {DirectoryLibrary, StringLibrary},
	data: () => ({
		currentId: 0,
	}),
	computed: {
		...mapGetters([
			'LIBRARIES',
			'isAccessAdmin'
		]),
		current() {
			if (this.LIBRARIES.length === 0) {
				return {
					"id": 0,
					"name": "Выберите папку",
					"files": []
				}
			}

			const libraries = this.LIBRARIES
			for (let i = 0; i < libraries.length; i++) {
				if (libraries[i].id === this.currentId) {
					return libraries[i]
				}
			}

			return {
				"id": 0,
				"name": "Выберите папку",
				"files": []
			}
		}
	},
	methods: {
		...mapActions([
			'GET_LIBRARIES_FROM_API',
			'POST_LIBRARY_FILE',
		]),
		onDirectoryClick(libraryId) {
			this.currentId = libraryId
		},
		onButtonAddClick() {
			if (this.currentId > 0) {
				this.$refs.fileInput.click()
			} else {
				note({
					content: "<b>Пожалуйста, выберите папку</b>",
					type: "warn", //success,warn,info,error
					time: 3
				});
			}
		},
		handleFileChange(e) {
			e.preventDefault()
			const file = e.target.files[0]
			if (file == null) return
			this.POST_LIBRARY_FILE({libraryId: this.current.id, caption: file.name, file: file})
				.then(() => {
					note({
						content: "<b>Файл успешно добавлен</b>",
						type: "success", //success,warn,info,error
						time: 3
					});
				}, err => {
					note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					});
				})
		}
	},
	mounted() {
		this.GET_LIBRARIES_FROM_API()
	}
}
</script>

<style>
.library {
	background-color: #FFFFFF;
}

.library__rectangle {
	background-color: rgba(7, 70, 146, 0.1);
	height: 380px;
}

.library__menu-top {
	display: flex;
	padding-top: 210px;
	align-items: center;
	/*justify-content: space-between;*/
}

.library__name {
	font-family: 'RobotoBold', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	color: #000000;
}

.library__button {
	width: 187px;
}

.library__button-inactive {
	background-color: rgba(7, 70, 146, 0.4);
	width: 187px;
}

.library__button-inactive:hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.library__button-invisible {
	display: none;
}

.library__search {
	width: 59%;
	display: flex;
	background: #FFFFFF;
	box-sizing: border-box;
	border-radius: 4px;
	margin-right: 60px;
	margin-left: 60px;
}

.library__search-input {
	width: 100%;
	border: 1px solid #074692;
	border-radius: 4px 0 0 4px;
	/*padding: 13px 14px 14px 30px;*/
	padding-left: 30px;
	font-weight: 300;
	font-size: 18px;
	line-height: 21px;
	color: rgba(36, 42, 53, 0.6)
}

.library__search-icon {
	width: 21px;
	height: 21px;
}

.library__search-button {
	padding: 12px 15px 11px 14px;
	border: 1px solid #074692;
	border-radius: 0 4px 4px 0;
	margin-left: -1px;
	cursor: pointer;
}


.library__directory {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 60px;
}

.library__container {
	margin-top: 100px;
	margin-bottom: 50px;
}

.library__title {
	font-family: 'RobotoMedium', sans-serif;
	font-weight: 500;
	font-size: 22px;
	line-height: 26px;
	color: #242A35;
	margin-bottom: 50px;
}

@media (max-width: 1200px) {
	.library__directory {
		flex-wrap: wrap;
	}
}
@media (max-width: 992px) {
	.library__container {
		margin-top: 270px;
	}
}

</style>
