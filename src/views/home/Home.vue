<template>
	<div class="home">
		<div class="container">
			<div class="main-screen">
				<div class="main-screen__text">
					<div class="main-screen__title">Инновации в пищевой биотехнологии</div>
					<div class="main-screen__description">
						Биотехнология – это сложная, многоаспектная и активно развивающаяся отрасль знаний, прикладное
						применение которой на сегодняшний день не имеет границ. <br/><br/> Специалист, перед которым
						ставится задача, должен в установленные сроки понять ее, проанализировать входные данные,
						подобрать и разработать эффективные подходы и методы решения поставленной задачи. <br/><br/>
						Работа над любым прикладным проектом требует не только определенных знаний и навыков в области
						биотехнологии, но и в смежных областях.
					</div>
				</div>
				<img src="../../../public/assets/background_home.jpg" alt="" class="main-screen__image">
			</div>
			<NewsBlock/>
		</div>
	</div>
</template>

<script>
import NewsBlock from "@/views/feed/NewsBlock";

export default {
	name: 'Home',
	components: {
		NewsBlock,
	},
}
</script>
<style>

.home {
	background-color: #FFFFFF;
	/*width: 100%;*/
}

.main-screen {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 210px;
	margin-bottom: 60px;
	flex-direction: row;
}

.main-screen__text {
	/*margin-right: 89px;*/
	max-width: 433px;
	/*margin-top: 40px;*/
}

.main-screen__image {
	max-width: 661px;
	height: 534px;
	object-fit: cover;

}

.main-screen__title {
	font-family: 'RobotoMedium', sans-serif;
	font-size: 40px;
	line-height: 47px;
	color: #242A35;
	font-weight: 500;
}

.main-screen__description {
	margin-top: 25px;
	font-size: 18px;
	line-height: 25px;
	margin-bottom: 40px;
	color: #242A35;
}


</style>
