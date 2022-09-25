<template>
	<div class="directory" @click="onClickCallback(directory_data.id)" :class="isActive">
		<div class="directory__image">
			<div class="directory__image-rectangle"></div>
			<img src="../../../public/assets/icon_directory.png" alt="Icon: Directory" class="directory__image-icon">
		</div>
		<div class="directory__name">{{ directory_data.name }}</div>
	</div>
</template>

<script>
export default {
	name: "DirectoryLibrary",
	props: {
		directory_data: {
			type: Object,
			required: true,
		},
		current_directory: {
			type: Object,
			required: true,
		},
		onClickCallback: {
			type: Function,
			required: true,
		},
	},
	computed: {
		isActive() {
			if (this.current_directory.id === this.directory_data.id) {
				return 'directory_hover'
			}
			return ''
		}
	}
}
</script>

<style>
.directory {
	padding: 15px 10px 10px 15px;
	width: 200px;
	height: 120px;
	background-color: #FFFFFF;
	border-radius: 4px;
	border: 1px solid #074692;
	cursor: pointer;
}

.directory:hover, .directory_hover {
	box-shadow: 0px 4px 10px rgba(7, 70, 146, 0.4);
}

.directory_hover {
	background-color: rgba(7, 70, 146, 0.4);
}

.directory__image {
	position: relative;
	margin-bottom: 15px;
}

.directory__image-rectangle {
	width: 30px;
	height: 30px;
	background-color: #074692;
	border-radius: 4px;
}

.directory__image-icon {
	position: absolute;
	width: 20px;
	height: 20px;
	top: 5px;
	left: 5px;
}

.directory__name {
	font-size: 13px;
	line-height: 15px;
	color: #242A35
}

@media (max-width: 1200px) {
	.directory {
		width: 175px;
		height: 130px;
		margin-right: 10px;
	}

	.directory:last-child {
		margin-right: 0;
	}
}

@media (max-width: 992px) {
	.directory {
		margin-bottom: 20px;
	}

	.directory:nth-child(3n) {
		margin-right: 0;
	}
}
</style>
