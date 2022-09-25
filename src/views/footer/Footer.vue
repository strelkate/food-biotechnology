<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__text">
				<div class="footer__text-col footer__text-col-1">
					<p>2021 г. Южно-Уральский государственный<br>университет (г. Челябинск)</p>
					<p>При использовании информации ссылка<br>на сайт обязательна.</p>
				</div>
				<div class="footer__text-col footer__text-col-2">
					<p>Науменко Наталья Владимировна, доктор технических наук, доцент кафедры «Пищевые и
						биотехнологии»</p>
					<p>Россия, 454080 Челябинск, проспект Ленина, 76<br>Тел./факс: +7 (351) 267-93-80<br>E-mail:
						Naumenkonv@susu.ru</p>
				</div>
				<div class="footer__text-col footer__text-col-3">
					<p>Проект реализуется победителем Конкурса на представление грантов преподавателям магистратуры
						благотворительной программы «Стипендиальная программа Владимира Потанина» Благотворительного
						фонда Владимира
						Потанина.</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer"
}
</script>

<style>
.footer {
	background-color: #242A35;
}

.footer__text {
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: flex-start;
	font-size: 12px;
	line-height: 14px;
	color: #FFFFFF
}

.footer__text-col {
	width: 343px;
}
</style>
