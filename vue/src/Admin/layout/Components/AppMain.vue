<template>
	<div class="outerContainerAppMain app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</div>
</template>

<script>
export default {
	computed: {
		cachedViews() {
			return this.$store.state.tagsView.cachedViews;
		},
		key() {
			return this.$route.path;
		}
	}
};
</script>

<style scoped lang="scss">
.outerContainerAppMain {
	overflow: hidden; /* to prevent scrollbar appearing on transition */
}
.app-main {
	/* 50= navbar  50  */
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
}

.fixed-header + .app-main {
	padding-top: 50px;
}
</style>
