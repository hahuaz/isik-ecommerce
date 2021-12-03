<template>
	<div class="outerContainerSignIn">
		<FormulateForm v-model="values" @submit="handleSignIn" class="customForm">
			<h1 class="font-bold mb-4 border-b border-black inline-block text-xl">
				Giriş Yapın
			</h1>
			<FormulateInput
				wrapper-class="pb-4"
				type="email"
				name="email"
				label="Email Adresiniz:"
				validation="required|email"
				:validation-messages="{
					required: 'Email gereklidir.'
				}"
			/>
			<FormulateInput
				wrapper-class="pb-4"
				type="password"
				name="password"
				label="Şifreniz:"
				validation="required|min:6,length"
				:validation-messages="{
					required: 'Şifre gereklidir.',
					min: 'Şifre en az 6 haneli olmalıdır.'
				}"
			/>

			<FormulateInput type="submit" label="Giriş Yap" />
			<p class="text-red-600 font-bold" v-if="error">{{ error }}</p>
		</FormulateForm>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			values: {},
			error: null
		};
	},
	computed: {
		...mapGetters(["getUser"])
	},
	methods: {
		...mapActions(["signIn"]),
		async handleSignIn() {
			try {
				await this.signIn(this.values);
				if (this.getUser.role === "admin") {
					this.$router.replace("/admin");
					this.$root.admin = true;
				} else {
					this.$router.replace("/");
				}
			} catch (error) {
				this.error = error.response.data.message;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.outerContainerSignIn {
	min-height: 35rem;
	margin: 1rem 0;
	padding: 1rem 0;
	background-image: url("../assets/img/loginBackground.jpg");
	background-position: center;
	background-size: cover;

	display: grid;
	place-items: center;
	.customForm {
		padding: 2rem 4rem;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 5%;
		h1 {
			position: relative;
			top: -0.5rem;
			left: -1rem;
		}
	}
}
</style>
