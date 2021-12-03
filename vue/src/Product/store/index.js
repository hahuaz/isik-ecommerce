import vue from "vue";
import vuex from "vuex";
import vuexPersistedState from "vuex-persistedstate";

import auth from "./auth.js";
import sepet from "./sepet.js";

vue.use(vuex);

export default new vuex.Store({
	plugins: [
		vuexPersistedState({
			// persist vuex on reload but delete after tab closed
			storage: window.sessionStorage
		})
	],
	state: {},
	getters: {},
	actions: {},
	mutations: {},
	modules: {
		auth,
		sepet
	}
});
