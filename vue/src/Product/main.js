import Vue from "vue";
import App from "./App.vue";
import VueFormulate from "@braid/vue-formulate";
import VueAgile from "vue-agile";

import store from "./store/index.js";
import router from "./router/index.js";

Vue.config.productionTip = false;

// for carousel
Vue.use(VueAgile);

// for inputs
Vue.use(VueFormulate, {
	classes: {
		wrapper: "pb-1",
		label: "font-bold",
		input:
			"bg-grey border border-grey mt-1 rounded-md pt-1 pb-2 px-2 focus:border-green-500 outline-none shadow-sm w-64",
		error: "text-red-700 text-xs mb-1"
	}
});

require("./store/subscriber"); /* set token header for further requests*/

// get user information with local token when page new open(normal action çağıryoruz.)
// note localStorage holds value as string
if (localStorage.getItem("token") !== "null") {
	store.dispatch("getUser", localStorage.getItem("token"));
}

export default new Vue({
	data() {
		return { loading: false };
	},
	router,
	store,
	render: h => h(App)
}).$mount("#app");
