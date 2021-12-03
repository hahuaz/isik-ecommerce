<template>
	<div class="outerContainerLanding">
		<nav-bar class="mb-2"></nav-bar>
		<carousel></carousel>
		<grids></grids>
	</div>
</template>

<script>
import NavBar from "../NavBar.vue";
import Carousel from "./Carousel.vue";
import Grids from "./Grids.vue";

export default {
	components: {
		NavBar,
		Carousel,
		Grids
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
