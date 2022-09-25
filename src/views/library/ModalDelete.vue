<template>
	<div class="modal-delete">
		<div id="modal-delete_overlay" class="modal-delete__overlay" @click="onCancelClick"></div>
		<div class="modal-delete__dialog">
			<div class="modal-delete__title">Удаление файла</div>
			<div class="modal-delete__form">
				<div class="modal-delete__description">Вы действительно хотите удалить выбранный файл?</div>
				<div class="modal-delete__button">
					<button class="modal-delete__button-cancel" @click="onCancelClick">Отмена</button>
					<button class="button modal-delete__button-delete" @click="onDeleteClick">Удалить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ModalDelete",
	props: {
		onDeleteClick: {
			type: Function,
			required: true
		},
		onCancelClick: {
			type: Function,
			required: true
		}
	},
}
</script>

<style>

.modal-delete {
	display: flex;
	flex-direction: column;
}

.modal-delete__overlay {
	position: fixed;
	z-index: 1000;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.75);
	visibility: visible;
	opacity: 1;
	transition: opacity 0.2s;
}

.modal-delete__dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 478px;
	max-height: 100%;
	transform: translate(-50%, -50%);
	padding: 60px 40px;
	background-color: #FFFFFF;
	/*color: $dark;*/
	z-index: 1001;
	transition: opacity 0.2s;
	overflow: auto;
	visibility: visible;
	opacity: 1;
}

.modal-delete__title {
	display: flex;
	justify-content: center;
	font-size: 22px;
	line-height: 25px;
	color: #242A35;
	margin-bottom: 40px;
}

.modal-delete__form {
	display: flex;
	flex-direction: column;
}

.modal-delete__description {
	font-size: 16px;
	line-height: 19px;
	color: #242A35;
	margin-bottom: 140px;
}

.modal-delete__button {
	display: flex;
	align-items: center;
	justify-content: space-between;

}

.modal-delete__button-cancel {
	width: 187px;
	height: 50px;
	background: #FFFFFF;
	border-color: #074692;
	border-radius: 4px;
	font-size: 18px;
	line-height: 21px;
	margin-right: 25px;
	cursor: pointer;
}

.modal-delete__button-delete {
	width: 187px;
	height: 50px;
}
</style>
