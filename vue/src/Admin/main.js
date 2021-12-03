import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import store from "./store/index.js";
import { router } from "./router/index.js";

import "./styles/index.scss"; // global css

import './icons' // icon


Vue.config.productionTip = false;

// require("@/store/subscriber"); /* set token header for further requests*/

// // get user information with local token when page new open(normal action çağıryoruz.)
// // note localStorage holds value as string
// if (localStorage.getItem("token") !== "null") {
//   store.dispatch("getUser", localStorage.getItem("token"));
// }

export default new Vue({
	data() {
		return {};
	},
	router,
	store,
	render: h => h(App)
}).$mount("#app");
