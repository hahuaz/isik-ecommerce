import axios from "axios";

export default {
	state: {
		user: null,
		token: null
	},
	getters: {
		authenticated(state) {
			if (state.token && state.user) return true;
			return false;
		},
		getUser(state) {
			return state.user;
		}
	},
	actions: {
		// u can use dispatch instead of commit to call other actions
		async signUp({ commit }, credentials) {
			const { data } = await axios.post("/api/users/signup", credentials);

			/* be aware if data don't destruct from request then accessing a property of "undefined" throw js error. but in above if axios get error from sw side it throw error and below code won't be reached */
			commit("SET_TOKEN", data.jwtToken);
			commit("SET_USER", data.user);
		},
		async signIn({ commit }, credentials) {
			const { data } = await axios.post("/api/users/login", credentials);
			commit("SET_TOKEN", data.jwtToken);
			commit("SET_USER", data.user);
		},
		signOut({ commit }) {
			commit("SET_TOKEN", null);
			commit("SET_USER", null);
		},
		/* TODO makes reqeuest withot token. if wont work */
		async getUser({ commit }, token) {
			if (token) {
				commit("SET_TOKEN", token);

				const { data } = await axios.get("/api/users");

				commit("SET_USER", data);
			}
		},
		async updateUser({ commit }, values) {
			const { data } = await axios.patch("/api/users", values);
			commit("SET_USER", data);
		},
		async updatePassword({ commit }, values) {
			const { data } = await axios.patch("/api/users/update-password", values);
			// if ({data}.response.data.status === "fail") return;

			commit("SET_TOKEN", data.jwtToken);
		}
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
		},
		SET_USER(state, user) {
			state.user = user;
		}
	}
};
