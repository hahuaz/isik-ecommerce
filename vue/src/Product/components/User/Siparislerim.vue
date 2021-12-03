<template>
	<div class="outerContainerSiparis">
		<nav-bar></nav-bar>
		<p v-if="error" style="color: red;">
			Siparişler alınamadı.Lütfen bizimle iletişime geçin.
		</p>
		<div v-if="orders.length === 0" class="empty">
			<p>Henüz hiç sipariş vermedin.</p>
			<p>Haydi alışverişe...</p>
		</div>
		<div v-else>
			<div class="orders">
				<ul class="orderHead">
					<li>Ürün Bilgisi</li>
					<li>Sipariş Tarihi</li>
					<li>Sipariş Adeti</li>
					<li>Birim Fiyat</li>
					<li>Kargo Numarası</li>
				</ul>
				<div class="order" v-for="(order, index) in orders" :key="index">
					<div class="imageContainer">
						<router-link :to="'/urunler/' + order.type + '/' + order.productId">
							<img :src="order.images[0]" alt />
						</router-link>
						{{ order.productName }}
					</div>
					<span>
						{{ new Date(order.createdAt).toISOString().slice(0, 10) }}
					</span>
					<span>{{ order.quantity }}</span>
					<span>{{ order.netPrice }} TL</span>
					<span>5123433</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import NavBar from "../NavBar.vue";

export default {
	components: {
		NavBar
	},
	data() {
		return {
			show: true,
			orders: [],
			error: null
		};
	},
	computed: {
		...mapGetters(["getUser"])
	},
	async created() {
		try {
			this.$root.loading = true;
			// 1. fetch orders by user id
			const { data } = await axios.get(
				`/api/orders/siparislerim/${this.getUser._id}`
			);
			this.orders = data.orders; /* all orders */
			this.$root.loading = false;
		} catch (error) {
			this.$root.loading = false;

			this.error = true;
		}
	}
};
</script>

<style scoped lang="scss">
.outerContainerSiparis {
	.orders {
		width: 100%;
		min-height: 800px;
		background-image: linear-gradient(
				rgba(255, 255, 255, 0.2),
				rgba(255, 255, 255, 0.2)
			),
			url("../../assets/img/orders.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: bottom;
		padding: 1.5rem 0;

		margin-top: 1rem;
		.orderHead {
			list-style: none;
			display: flex;
			justify-content: space-around;
			padding: 15px 20px 3px 20px;
			border-bottom: 1px solid black;
			display: grid;
			grid-template-columns: 200px 1fr 1fr 1fr 1fr;
			text-align: center;
		}
		.order {
			width: 100%;

			margin: 5px 10px 10px;
			padding: 10px 20px;
			background-color: rgba(255, 255, 255, 0.356);

			display: grid;
			grid-template-columns: 200px 1fr 1fr 1fr 1fr;
			text-align: center;
			align-items: center;

			.imageContainer {
				img {
					height: 200px;
					width: 200px;
				}
			}
		}
	}
	.empty {
		min-height: 500px;
		background-image: linear-gradient(
				rgba(255, 255, 255, 0.2),
				rgba(255, 255, 255, 0.2)
			),
			url("../../assets/img/empty.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		padding: 1.5rem 0;
		margin: 1rem 0;
		p {
			font-weight: bold;
			font-size: 2rem;
			color: white;
			text-align: right;
			padding-right: 1rem;
		}
	}
}
</style>
