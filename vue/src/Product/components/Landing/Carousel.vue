<template>
	<div class="customCarousel">
		<agile :autoplay="true">
			<div class="slide">
				<img src="../../assets/img/landing/carousel/slide0.jpg" alt />
			</div>
			<div class="slide">
				<img src="../../assets/img/landing/carousel/slide1.jpg" alt />
			</div>
			<div class="slide">
				<img src="../../assets/img/landing/carousel/slide2.jpg" alt />
			</div>
			<div class="slide">
				<img src="../../assets/img/landing/carousel/slide3.jpg" alt />
			</div>
			<template slot="prevButton">
				<i class="fas fa-chevron-left"></i>
			</template>
			<template slot="nextButton">
				<i class="fas fa-chevron-right"></i>
			</template>
		</agile>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="sass">
.customCarousel
	height: 500px
	.agile
		.slide
			img
				// agile'nin düzgün çalışması için image'lerinin height'i belirli olmalı!
				height: 500px
				width: 100%
		&__nav-button
			background: transparent
			border: none
			color: #e0e0e0
			cursor: pointer
			font-size: 24px
			height: 100%
			position: absolute
			top: 0
			transition-duration: .3s
			width: 80px

			&:hover
				background-color: rgba(#000, .5)
				opacity: 1

			&--prev
				left: 0

			&--next
				right: 0
		&__dots
			bottom: 10px
			left: 50%
			position: absolute
			transform: translateX(-50%)

		&__dot
			margin: 0 10px

			button
				background-color: transparent
				border: 1px solid #e0e0e0
				border-radius: 50%
				cursor: pointer
				display: block
				height: 10px
				font-size: 0
				line-height: 0
				margin: 0
				padding: 0
				transition-duration: .3s
				width: 10px
			&--current
				background-color: #e0e0e0
				border-radius: 50%
</style>
