<template>
	<div class="outerContainerSidebar">
		<!-- scrollbar-wrapper class in sidebar.scss.   all scss files will be included by import index.scss in main.js-->
		<div class="sidebar-logo-container" :class="{'collapse':isCollapse}">
			<transition name="sidebarLogoFade">
				<router-link v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/admin">
					<img src="@/Admin/assets/img/logoNoString.png" class="sidebar-logo" />
				</router-link>
				<router-link v-else key="expand" class="sidebar-logo-link" to="/admin">
					<img src="@/Admin/assets/img/logoNoString.png" class="sidebar-logo" />
					<h1 class="sidebar-title">Isık AVM</h1>
				</router-link>
			</transition>
		</div>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				:collapse="isCollapse"
				:background-color="variables.menuBg"
				:text-color="variables.menuText"
				:unique-opened="false"
				:active-text-color="variables.menuActiveText"
				:collapse-transition="false"
				mode="vertical"
			>
				<sidebar-item
					v-for="route in getRoutes"
					:key="route.path"
					:item="route"
					:base-path="route.path"
				/>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "../../../styles/variables.scss";
export default {
	components: { SidebarItem },
	computed: {
		...mapGetters(["getRoutes", "getSidebar"]),
		activeMenu() {
			const route = this.$route;
			const { meta, path } = route;
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},
		showLogo() {
			return this.$store.state.settings.sidebarLogo;
		},
		variables() {
			return variables;
		},
		isCollapse() {
			return !this.getSidebar.opened;
		}
	},
	methods: {
		...mapActions(["generateRoutes"])
	},
	created() {
		this.generateRoutes(); /* set routes to vuex when created */
	}
};
</script>

<style scoped lang="scss">
.outerContainerSidebar {
	.sidebarLogoFade-enter-active {
		transition: opacity 1.5s;
	}

	.sidebarLogoFade-enter,
	.sidebarLogoFade-leave-to {
		opacity: 0;
	}
	.sidebar-logo-container {
		position: relative;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: rgb(57, 139, 187);
		text-align: center;
		overflow: hidden;

		& .sidebar-logo-link {
			height: 100%;
			width: 100%;

			& .sidebar-logo {
				width: 60px;
				height: 40px;
				vertical-align: middle;
				margin-right: 12px;
			}

			& .sidebar-title {
				display: inline-block;
				margin: 0;
				color: #f4f4f5;
				font-weight: 600;
				line-height: 50px;
				font-size: 14px;
				font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
				vertical-align: middle;
			}
		}

		&.collapse {
			.sidebar-logo {
				margin-right: 0px;
			}
		}
	}
}
</style>
