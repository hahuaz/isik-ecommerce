<template>
	<!-- TODO bu component, hesabim router view olcak -->
	<div class="auto">
		<div class="credentialContainer">
			<FormulateForm
				v-model="values"
				@submit="handleUpdate"
				class="credentialForm"
			>
				<h3>Bilgileri Doldurun</h3>
				<FormulateInput
					type="email"
					name="email"
					label="Email Adresiniz"
					validation="email"
					:validation-messages="{
						email: 'Geçerli e-mail girin.'
					}"
				/>
				<FormulateInput
					type="number"
					name="phone"
					label="Telefon no"
					validation="required|min:10,length|max:10,length"
					:validation-messages="{
						required: 'Ürün teslimi için telefon numarası girin',
						min: 'Numaranız 10 haneli olmalı.Başına 0 koymayın.',
						max: 'Numaranız 10 haneli olmalı.Başına 0 koymayın.'
					}"
				/>
				<FormulateInput
					type="number"
					name="tc"
					label="TC (Ödeme için gerekli)"
					validation="required|min:11,length|max:11,length"
					:validation-messages="{
						required: 'Ödeme için TC girin.',
						min: 'TC 11 haneli olmalı.',
						max: 'TC 11 haneli olmalı.'
					}"
				/>
				<FormulateInput
					type="textarea"
					name="adress"
					label="Adres"
					validation="required"
					:validation-messages="{
						required: 'Ürün teslimi için adres girin.'
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
		...mapActions(["updateUser"]),
		async handleUpdate() {
			try {
				console.log(this.values);
				await this.updateUser(this.values);
				this.$router.replace("/hesabim");
			} catch (error) {
				this.error = error.response.data;
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
			rgba(200, 200, 200, 0.5),
			rgba(200, 200, 200, 0.5)
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
