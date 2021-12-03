<template>
	<div class="outerContainerNavbar navbar">
		<hamburger
			id="hamburger-container"
			:is-active="getSidebar.opened"
			class="hamburger-container"
			@toggleClick="toggleSidebar"
		/>
		<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

		<p>this is navbar</p>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/Admin/components/Hamburger";
import Breadcrumb from "@/Admin/components/Breadcrumb";

export default {
	name: "Navbar",
	components: {
		Hamburger,
		Breadcrumb
	},
	computed: {
		...mapGetters(["getSidebar"])
	},
	methods: {
		toggleSidebar() {
			this.$store.dispatch("toggleSidebar");
		}
	}
};
</script>

<style lang="scss" scoped>
.outerContainerNavbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.15);
	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}
}
</style>
