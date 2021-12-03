<template>
	<div :class="classObj" class="app-wrapper">
		<sidebar class="sidebar-container" />
		<div class="main-container">
			<div class="fixed-header">
				<navbar />
			</div>
			<app-main />
		</div>
	</div>
</template>

<script>
import Sidebar from "./Components/Sidebar";
import AppMain from "./Components/AppMain.vue";
import Navbar from "./Components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
	components: {
		Sidebar,
		AppMain,
		Navbar
	},
	computed: {
		...mapGetters(["getSidebar"]),
		classObj() {
			return {
				hideSidebar: !this.getSidebar.opened
				// withoutAnimation: this.sidebar.withoutAnimation,
				// mobile: this.device === 'mobile'
			};
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/Admin/styles/mixin.scss";
@import "@/Admin/styles/variables.scss";

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;

	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}

.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$sideBarWidth});
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}

.mobile .fixed-header {
	width: 100%;
}
</style>
