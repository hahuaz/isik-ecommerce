<template>
	<div class="outerContainer">
		<div class="left1">
			<router-link to>
				<img src="../../assets/img/landing/left1.jpg" alt />
			</router-link>
		</div>
		<div class="left2">
			<router-link to>
				<img src="../../assets/img/landing/left2.jpg" alt />
			</router-link>
		</div>
		<div class="hero">
			<router-link to>
				<img src="../../assets/img/landing/hero.jpg" alt />
			</router-link>
		</div>
		<div class="bot1">
			<router-link to>
				<img src="../../assets/img/landing/bot1.jpg" alt />
			</router-link>
		</div>
		<div class="bot2">
			<router-link to>
				<img src="../../assets/img/landing/bot2.jpg" alt />
			</router-link>
		</div>

		<div class="bot3">
			<router-link to>
				<img src="../../assets/img/landing/bot3.jpg" alt />
			</router-link>
		</div>
	</div>
</template>

<script>
export default {};
</script>
<style scoped lang="scss">
.outerContainer {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 280px 280px 280px;
	grid-template-areas:
		"left1 left1 left1  hero hero hero"
		"left2 left2 left2 hero hero hero"
		"bot1 bot1 bot2 bot2 bot3 bot3";
	gap: 10px;
	padding: 20px;
	> div {
		height: 100%;
		overflow: hidden;
		img {
			height: 100%;
			width: 100%;
		}
	}
	.left1 {
		grid-area: left1;
	}
	.left2 {
		grid-area: left2;
	}
	.hero {
		grid-area: hero;
	}
	.bot1 {
		grid-area: bot1;
	}
	.bot2 {
		grid-area: bot2;
	}
	.bot3 {
		grid-area: bot3;
	}
}
</style>
