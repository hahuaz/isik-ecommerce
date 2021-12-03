import vue from "vue";
import vuex from "vuex";
import vuexPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";
import { routes } from "../router";

vue.use(vuex);

export default new vuex.Store({
	plugins: [
		vuexPersistedState({
			// persist vuex on reload but delete after tab closed
			storage: window.sessionStorage
		})
	],
	state: {
		sidebar: {
			opened: Cookies.get("sidebarStatus")
				? !!+Cookies.get("sidebarStatus")
				: true
			// withoutAnimation: false
		},
		routes: []
	},
	getters: {
		getRoutes(state) {
			return state.routes;
		},
		getSidebar(state) {
			return state.sidebar;
		}
	},
	actions: {
		generateRoutes({ commit }) {
			commit("SET_ROUTES", routes);
		},
		toggleSidebar({ commit }) {
			commit("TOGGLE_SIDEBAR");
		}
	},
	mutations: {
		SET_ROUTES: (state, routes) => {
			state.routes = routes;
		},
		TOGGLE_SIDEBAR: state => {
			state.sidebar.opened = !state.sidebar.opened;
			// state.sidebar.withoutAnimation = false
			if (state.sidebar.opened) {
				Cookies.set("sidebarStatus", 1);
			} else {
				Cookies.set("sidebarStatus", 0);
			}
		}
	},
	modules: {}
});
