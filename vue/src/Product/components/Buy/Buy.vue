<template>
	<div class="outerContainerBuy">
		<nav-bar></nav-bar>
		<fade-transition origin="center" mode="out-in" :duration="250">
			<router-view></router-view>
		</fade-transition>
	</div>
</template>

<script>
import NavBar from "../NavBar.vue";
import { FadeTransition } from "vue2-transitions";

export default {
	name: "Buy",
	components: { NavBar, FadeTransition }
};
</script>

<style></style>
