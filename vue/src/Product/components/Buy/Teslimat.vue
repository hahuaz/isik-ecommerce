<template>
	<div class="outerContainerTeslimat">
		<buy-header anActive="teslimatBilgi" />
		<div class="container">
			<div class="form">
				<FormulateForm @submit="handleOrder" class="formulateForm">
					<h3>Teslimat Bilgileri</h3>

					<FormulateInput
						error-class="text-green-400 text-xs mb-1"
						type="number"
						name="phone"
						label="Telefon:"
						v-model="inputPhone"
						validation="required|min:10,length|max:10,length"
						:validation-messages="{
							required: 'Ürün teslimi için telefon numarası girin',
							min: 'Numaranız 10 haneli olmalı.Başına 0 koymayın.',
							max: 'Numaranız 10 haneli olmalı.Başına 0 koymayın.'
						}"
					/>
					<FormulateInput
						error-class="text-green-400 text-xs mb-1"
						type="number"
						name="tc"
						label="TC:"
						v-model="inputTc"
						validation="required|min:11,length|max:11,length"
						:validation-messages="{
							required: 'Ödeme için TC girin.',
							min: 'TC 11 haneli olmalı.',
							max: 'TC 11 haneli olmalı.'
						}"
					/>

					<FormulateInput
						error-class="text-green-400 text-xs mb-1"
						type="textarea"
						name="adress"
						v-model="inputAdress"
						label="Adres:"
						validation="required"
						:validation-messages="{
							required: 'Ürün teslimi için adres girin.'
						}"
					/>

					<FormulateInput type="submit" label="Devam >" class="saveButton" />
				</FormulateForm>
				<p class="text-red-600 font-bold" v-if="error">{{ error }}</p>
				<vue-loading
					v-if="showLineLoading"
					type="spiningDubbles"
					color="#b62368"
					:size="{ width: '40px', height: '40px' }"
					style="display: block;"
				></vue-loading>
				<span
					class="text-lg font-bold"
					style="color:#b62368"
					v-if="showLineLoading"
					>Ödeme sayfasına yönlendiriliyorsunuz...</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import BuyHeader from "./BuyHeader.vue";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { VueLoading } from "vue-loading-template";
import { mapActions, mapGetters } from "vuex";

export default {
	components: {
		BuyHeader,
		VueLoading
	},
	data() {
		return {
			inputPhone: null,
			inputAdress: null,
			inputTc: null,
			error: null,
			showLineLoading: false
		};
	},
	computed: {
		...mapGetters(["getUser", "getProductsInSepet"])
	},
	methods: {
		...mapActions(["updateUser"]),
		async handleOrder() {
			try {
				this.showLineLoading = true;

				const values = {
					adress: this.inputAdress,
					phone: this.inputPhone,
					tc: this.inputTc
				};
				if (
					this.getUser.phone !== this.inputPhone ||
					this.getUser.adress !== this.inputAdress ||
					this.getUser.tc !== this.inputTc
				) {
					await this.updateUser(values);
				}

				const { data } = await axios.post("/api/orders/initPayForm", {
					products: this.getProductsInSepet,
					user: this.getUser
				});
				setTimeout(() => {
					this.showLineLoading = false;

					window.location.href = `${data.paymentPageUrl}`;
				}, 2000);
			} catch (error) {
				this.showLineLoading = false;

				this.error = error.response.data;
			}
		}
	},
	mounted() {
		/* u can't refer getUser in data property directly cause getters will not be available to use when data property is created */
		this.inputPhone = this.getUser.phone;
		this.inputAdress = this.getUser.adress;
		this.inputTc = this.getUser.tc;
	}
};
</script>

<style scoped lang="scss">
.outerContainerTeslimat {
	.container {
		min-height: 700px;

		padding-top: 2rem; /* for backgorund photo center */
		background-image: linear-gradient(
				rgba(200, 200, 200, 0.5),
				rgba(200, 200, 200, 0.5)
			),
			url("../../assets/img/userDetailsBackground.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		display: grid;
		place-items: center;
		.form {
			.formulateForm {
				background-color: rgba(0, 0, 0, 0.1);
				padding: 2rem;
				border-radius: 5px;
				width: min-content;
				h3 {
					font-size: 1.2rem;
					padding-bottom: 5px;
					margin-bottom: 10px;
					font-weight: bold;
					border-bottom: 1px solid black;
					display: inline-block;
				}
				.saveButton {
					margin: 10px 0;
				}
			}
		}
	}
}
</style>
