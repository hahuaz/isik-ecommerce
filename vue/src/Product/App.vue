<template>
	<div id="app">
		<full-loading
			:show="this.$root.loading"
			label="Yükleniyor.."
		></full-loading>
		<app-header></app-header>

		<fade-transition origin="center" mode="out-in" :duration="250">
			<router-view :key="$route.path"></router-view>
		</fade-transition>
		<app-footer></app-footer>
	</div>
</template>

<script>
import FullLoading from "vue-full-loading";
import { FadeTransition } from "vue2-transitions";
import appHeader from "./layout/appHeader.vue";
import appFooter from "./layout/appFooter.vue";

export default {
	name: "App",
	components: {
		FullLoading,
		FadeTransition,
		appFooter,
		appHeader
	}
};
</script>

<style lang="scss">
@import "./assets/css/tailwind.css";

@font-face {
	font-family: Galano;
	src: url("./assets/GalanoGrotesque-Light.ttf");
}
body {
	font-family: Galano;
}

/* vue formulate buttons */
.formulate-input[data-classification="button"] button {
	border-color: #b62368;
	background-color: #b62368;
	color: white;
	margin: 0.5rem 0;
	padding: 0.1rem 0.7rem 0.4rem;
	transition: all ease-in-out 300ms;
	&:hover {
		box-shadow: 0 0 7px grey;
	}
}
</style>
