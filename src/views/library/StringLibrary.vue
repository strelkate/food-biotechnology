<template>
	<div class="string-library">
		<div class="string-library__content">
			<a :href="baseUrl + file_data.url" target="_blank" class="string-library__left">
				<img :src="icon" alt="file extension icon" class="string-library__icon-file">
				<div class="string-library__name">{{ file_data.caption }}</div>
			</a>
			<div
				v-if="isAccessAdmin"
				class="string-library__icon-trash"
				data-tooltip="Удалить"
				@click="onDeleteFileClick"
			>
				<img src="../../../public/assets/icon_trash.png" alt="Icon: trash">
			</div>
			<ModalDelete v-if="isModalDeleteShown" :onDeleteClick="deleteFile" :onCancelClick="closeDeleteModal"/>
		</div>
		<div class="string-library__line"></div>
	</div>
</template>
<script>
import {baseURL} from "@/api/helper";
import {mapActions, mapGetters} from "vuex";
import ModalDelete from "@/views/library/ModalDelete";

const regexp = /\.([0-9a-z]+$)/gi

export default {
	name: "StringLibrary",
	components: {
		ModalDelete,
	},
	props: {
		file_data: {
			type: Object,
			required: true
		},
		libraryId: {
			type: Number,
			required: true
		}
	},
	data: function () {
		return {
			baseUrl: baseURL,
			isModalDeleteShown: false,
		}
	},
	computed: {
		...mapGetters([
			'isAccessAdmin'
		]),
		icon() {
			// const match = this.file_data.url.matchAll(regexp)
			return "/assets/file_pdf.jpg"

			// if (match[1] === 'pdf'){
			// }
			// else {
			//   return "assets/file_.xls.jpg"
			// }
		}
	},
	methods: {
		...mapActions([
			'DELETE_LIBRARY_FILE',
		]),
		onDeleteFileClick() {
			this.showDeleteModal()
		},
		showDeleteModal() {
			this.isModalDeleteShown = true
		},
		closeDeleteModal() {
			this.isModalDeleteShown = false
		},
		deleteFile() {
			const fileId = this.file_data.id
			this.DELETE_LIBRARY_FILE({fileId: fileId, libraryId: this.libraryId})
				.then(() => {
					note({
						content: "<b>Файл удален</b>",
						type: "info", //success,warn,info,error
						time: 3
					});
				}, err => {
					note({
						content: err.message,
						type: "error", //success,warn,info,error
						time: 3
					});
				})
			this.closeDeleteModal()
		}
	}
}
</script>
<style>
.string-library {
	display: flex;
	flex-direction: column;
}

.string-library__content {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.string-library__left {
	display: flex;
	justify-content: center;
	text-decoration: none;
}

.string-library__icon-file {
	width: 21px;
	height: 21px;
	margin-right: 20px;
}

.string-library__name {
	font-size: 14px;
	line-height: 16px;
	color: #242A35;
}

.string-library__size {
	font-size: 14px;
	line-height: 16px;
	color: rgba(36, 42, 53, 0.6);
}

.string-library__icon-trash {
	width: 21px;
	height: 21px;
	cursor: pointer;
	position: relative;
}

.string-library__line {
	width: 100%;
	height: 1px;
	background-color: rgba(36, 42, 53, 0.1);
	margin-top: 15px;
	margin-bottom: 15px;
}
</style>
