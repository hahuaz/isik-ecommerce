<template>
	<div class="outerContainerSignUp">
		<FormulateForm v-model="values" @submit="handleSignUp" class="customForm">
			<h1 class="font-bold mb-4 border-b border-black inline-block text-xl">
				Kayıt Olun
			</h1>

			<FormulateInput
				type="text"
				name="userName"
				label="Ad:"
				validation="required|alpha:default"
				:validation-messages="{
					required: 'Ad gereklidir.',
					alpha: 'Sadece harf girilebilir.'
				}"
			/>
			<FormulateInput
				type="text"
				name="userSurname"
				label="Soyad:"
				validation="required|alpha:default"
				:validation-messages="{
					required: 'Soyad gereklidir.',
					alpha: 'Sadece harf girilebilir.'
				}"
			/>
			<FormulateInput
				type="email"
				name="email"
				label="Email:"
				validation="required|email"
				:validation-messages="{
					required: 'Email gereklidir.',
					email: 'Email adresi geçersiz.'
				}"
			/>
			<FormulateInput
				type="password"
				name="password"
				label="Şifre:"
				validation="required|min:6,length"
				:validation-messages="{
					required: 'Şifre gereklidir.',
					min: 'Şifre en az 6 haneli olmalıdır.'
				}"
			/>
			<FormulateInput type="submit" label="Kayıt Ol" />
			<p class="text-red-600 font-bold" v-if="error">{{ error }}</p>
		</FormulateForm>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			values: {},
			error: null
		};
	},
	methods: {
		...mapActions(["signUp"]),
		async handleSignUp() {
			try {
				await this.signUp(this.values);
				this.$router.replace("/");
			} catch (error) {
				this.error = error.response.data.message;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.outerContainerSignUp {
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
			top: -1rem;
			left: -1rem;
		}
	}
}
</style>
