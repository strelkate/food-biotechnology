<template>
	<div class="news-block">
		<div class="news-block__title">Новости</div>
		<div class="news-block__wrapper">
			<img src="../../../public/assets/arrow_left.svg" alt="Icon: arrow left" class="news-block__icon-arrow-left"
				 @click="prevSlide">
			<div class="news-block__container">
				<News
					class="news-block__card"
					v-for="news in currentNews"
					:key="news.id"
					:news_data="news"
				/>
			</div>
			<img src="../../../public/assets/arrow_right.svg" alt="Icon: arrow right"
				 class="news-block__icon-arrow-right"
				 @click="nextSlide">
		</div>
	</div>
</template>
<script>
import {mapActions} from "vuex";
import News from "@/views/feed/News";

const slideSize = 3

export default {
	name: "NewsBlock",
	components: {
		News
	},
	data: function () {
		return {
			feed: [],
			currentSlideIndex: 0
		}
	},
	computed: {
		currentNews() {
			const feedlen = this.feed.length
			if (feedlen === 0) {
				return []
			}
			let indexes = []
			for (let i = 0; i < slideSize && i < feedlen; i++) {
				indexes.push(this.currentSlideIndex + i)
			}

			let result = []
			indexes.forEach(index => {
				result.push(this.feed[index])
			})
			return result
		}
	},
	methods: {
		...mapActions([
			'GET_FEED_FROM_API', 'SET_CURRENT_NEWS',
		]),
		prevSlide() {
			let next = this.currentSlideIndex - slideSize
			if (next >= 0) {
				this.currentSlideIndex = next
			} else {
				this.currentSlideIndex = 0
			}
		},
		nextSlide() {
			let next = this.currentSlideIndex + slideSize
			if (this.feed.length - slideSize >= next) {
				this.currentSlideIndex = next
			} else {
				let last = this.feed.length - slideSize
				if (last < 0) {
					last = 0
				}
				this.currentSlideIndex = last
			}
		},
	},
	mounted() {
		this.GET_FEED_FROM_API()
			.then((response) => {
				this.feed = response.feed
				this.currentSlideIndex = 0
			})
	}
}
</script>

<style>
.news-block {
	padding-bottom: 80px;
}

.news-block__title {
	font-family: 'RobotoMedium', sans-serif;
	font-size: 30px;
	line-height: 35px;
	color: #242A35;
	margin-bottom: 40px;
}

.news-block__icon-arrow-left {
	margin-right: 29px;
	cursor: pointer;
	margin-top: 101px;
}

.news-block__icon-arrow-right {
	margin-left: 29px;
	cursor: pointer;
	margin-top: 101px;
}

.news-block__wrapper {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.news-block__container {
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
}

/*.news-block__card {*/
/*  margin-right: 20px;*/
/*}*/

/*.news-block__card:nth-child(3n) {*/
/*  margin-right: 0;*/
/*}*/
</style>
