<template>
	<div class="card-news" @click="openNewsArticle(news_data)">
		<div class="card-news__block-image">
			<img :src="baseURL + news_data.img" alt="Photo: news" class="card-news__image">
			<span class="card-news__label">{{ date }}</span>
		</div>
		<div class="card-news__title">{{ news_data.title }}</div>
	</div>
</template>
<script>
import {baseURL} from "@/api/helper";
import router, {PathHome, PathNews, PathNewsEdit} from "@/router";
import {mapActions} from "vuex";

export default {
	name: "News",
	props: {
		news_data: {
			type: Object,
			default() {
				return {}
			}
		},
	},
	data: function () {
		return {
			baseURL: baseURL,
		}
	},
	computed: {
		date() {
			let ts = new Date(this.news_data.publish_at)
			return ts.toLocaleDateString()
		}
	},
	methods: {
		...mapActions([
			'SET_CURRENT_NEWS',
		]),
		openNewsArticle(news) {
			if (this.$route.path === PathHome || this.$route.path === PathNews) {
				window.scrollTo({
					top: 30,
					behavior: 'smooth'
				});
				this.SET_CURRENT_NEWS(news)
				if (this.$route.path === PathNews) {
					return
				}
				router.push({path: PathNews})
			} else {
				this.SET_CURRENT_NEWS(news)
				if (this.$route.path === PathNewsEdit) {
					return
				}
				router.push({path: PathNewsEdit})
			}
		},
	},

}
</script>

<style>
.card-news {
	width: 347px;
	display: flex;
	/*margin-right: 40px;*/
	flex-direction: column;
	cursor: pointer;
}


.card-news__block-image {
	position: relative;
	z-index: 5;
}

.card-news__image {
	width: 100%;
	height: 237px;
	object-fit: cover;
	margin-bottom: 16px;
}

.card-news__title {
	font-size: 18px;
	line-height: 21px;
	color: #242A35;
}

.card-news__label {
	position: absolute;
	font-family: 'RobotoBold', sans-serif;
	font-weight: bold;
	left: 0;
	top: 0;
	font-size: 14px;
	line-height: 16px;
	color: #fff;
	background-color: #074692;
	padding: 25px 7px 9px 7px;
}
</style>
