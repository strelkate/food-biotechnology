<template>
	<div id="news-article" class="news-article">
		<div class="container">
			<div class="news-article__title">
				{{ CURRENT_NEWS.title }}
			</div>
			<div class="news-article__block-image">
				<img
					:src="baseURL + CURRENT_NEWS.img"
					alt="Photo: news"
					class="news-article__image"
				>
				<span class="news-article__label">{{ date }}</span>
			</div>
			<div class="news-article__description">
				{{ CURRENT_NEWS.body }}
			</div>
			<NewsBlock/>
		</div>
	</div>
</template>

<script>
import NewsBlock from "@/views/feed/NewsBlock";
import {baseURL} from "@/api/helper";
import {mapGetters} from "vuex";

export default {
	name: "NewsArticle",
	components: {
		NewsBlock
	},
	data: function () {
		return {
			baseURL: baseURL,
		}
	},
	computed: {
		...mapGetters([
			'CURRENT_NEWS'
		]),
		date() {
			let ts = new Date(this.CURRENT_NEWS.publish_at)
			return ts.toLocaleDateString()
		}
	},
}
</script>

<style>
.news-article__title {
	padding-top: 210px;
	font-family: 'RobotoBold', sans-serif;
	font-weight: bold;
	font-size: 30px;
	line-height: 35px;
	color: #242A35;
	margin-bottom: 40px;
}

.news-article__block-image {
	position: relative;
	z-index: 5;
	margin-bottom: 40px;
}

.news-article__image {
	height: 527px;
	max-width: 100%;
	object-fit: cover;
}

.news-article__label {
	position: absolute;
	font-family: 'RobotoBold', sans-serif;
	left: 0;
	top: 0;
	font-size: 14px;
	line-height: 16px;
	color: #fff;
	background-color: #074692;
	padding: 25px 7px 9px 7px;
}

.news-article__description {
	font-size: 18px;
	line-height: 21px;
	color: #242A35;
	margin-bottom: 60px;
	white-space: pre-wrap;
}

</style>
