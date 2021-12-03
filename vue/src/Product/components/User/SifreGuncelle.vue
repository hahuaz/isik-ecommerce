<template>
	<div class="auto">
		<div class="credentialContainer">
			<FormulateForm
				v-model="values"
				@submit="handleUpdate"
				class="credentialForm"
			>
				<h3>Bilgileri Doldurun</h3>
				<FormulateInput
					type="password"
					name="currentPassword"
					label="Eski şifreniz"
					validation="required|min:6,length"
					:validation-messages="{
						required: 'Geçerli şirenizi girin.',
						min: 'Geçerli şifreniz en az 6 haneli olmalı.'
					}"
				/>
				<FormulateInput
					type="number"
					name="newPassword"
					label="Yeni şifreniz"
					validation="required|min:6,length"
					:validation-messages="{
						required: 'Yeni şifre belirleyin',
						min: 'Yeni şifreniz en az 6 haneli olmalı.'
					}"
				/>
				<FormulateInput type="submit" label="Güncelle" />
				<p class="text-red-600 font-bold" v-if="error">{{ error }}</p>
			</FormulateForm>
		</div>
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
		...mapActions(["updatePassword"]),
		async handleUpdate() {
			try {
				await this.updatePassword(this.values);
				this.$router.replace("/hesabim");
			} catch (error) {
				this.error = error.response.data.message;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.auto {
	min-height: 500px;
	width: 100%;
	background-image: linear-gradient(
			rgba(200, 200, 200, 0.7),
			rgba(200, 200, 200, 0.7)
		),
		url("../../assets/img/userDetailsBackground.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	padding: 60px 0 20px;
	.credentialContainer {
		background-color: rgba(0, 0, 0, 0.1);
		padding: 20px 0 20px 20px;
		border-radius: 5px;
		width: 400px;
		margin: 0 auto;
		h3 {
			padding-bottom: 5px;
			margin-bottom: 10px;
			width: fit-content !important;
			font-weight: bold;
			position: relative;
			font-size: 1.2rem;
			position: relative;
			&::after {
				content: "";
				position: absolute;
				width: 140%;
				height: 1px;
				background-color: black;
				left: 0;
				bottom: 0;
			}
		}
	}
}
</style>
