<template>
	<div class="outerContainerProducts">
		<nav-bar></nav-bar>

		<div class="products">
			<div v-for="(product, index) in products" :key="index" class="product">
				<!-- don't put click event in router-link -->
				<router-link
					:to="'/urunler/' + product.type + '/' + product._id"
					tag="div"
					class="imgContainer"
				>
					<img v-bind:src="product.images[0]" />
				</router-link>
				<div class="details">
					<div class="data">
						<p class="price">
							{{ product.priceSchema.price - product.priceSchema.discount }} TL
						</p>
						<router-link
							class="name"
							:to="'/urunler/' + product.type + '/' + product._id"
							tag="p"
							>{{ product.productName }}</router-link
						>
					</div>
					<button @click="initAddProductToSepet(product)">SEPETE EKLE</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
import { mapActions } from "vuex";
export default {
	name: "Products",
	components: {
		NavBar
	},
	data() {
		return {
			thereIsNoProduct: false,

			products: []
		};
	},
	computed: {},
	methods: {
		...mapActions(["addProductToSepet"]),

		initAddProductToSepet(product) {
			const newProduct = { ...product, quantity: 1 };
			this.addProductToSepet(newProduct);
		},

		async fetchProducts() {
			const { data } = await axios.get(
				`/api/products/${this.$route.params.type}`
			);
			this.products = data;
			// verilen kategoride ürün yoksa client'i bilgilendir
			if (data.message === "Bu type'da hiç ürün yok") {
				this.$router.push({ path: "404" });
			}
		}
	},
	created() {
		this.fetchProducts();
	},
	destroyed() {}
};
</script>

<style scoped lang="scss">
.outerContainerProducts {
	.products {
		padding: 2rem;
		display: flex;
		gap: 5px;
		.product {
			border: 1px solid #e0e0e0;
			padding-bottom: 5px;
			width: 300px;
			height: 450px;
			.imgContainer {
				/* i added container cause there was gap between img and details.now it's gone */
				width: 100%;
				height: 75%;
				cursor: pointer;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.details {
				height: 25%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				padding: 0 7px; /* for sepete ekle's border */
				.data {
					margin: 5px;
					padding-bottom: 5px;
					width: 100%;
					position: relative;
					&::before {
						position: absolute;
						content: "";
						height: 1px;
						width: 70%;
						background-color: #e0e0e0;
						top: 0;
						left: 15%;
					}
					&::after {
						position: absolute;
						content: "";
						height: 1px;
						width: 70%;
						background-color: #e0e0e0;
						bottom: 0;
						left: 15%;
					}

					.price {
						font-weight: 900;
						letter-spacing: 1px;
						font-size: 1.2rem;
					}
					.name {
						word-spacing: -1.5px;
						letter-spacing: -0.8px;
						font-size: 0.7;
						cursor: pointer;
					}
				}
				button {
					letter-spacing: 1px;
					word-spacing: 2px;
					margin: 0px 30px;
					display: inline-block;
					width: 100%;
					line-height: 32px;
					font-weight: 200;
					border: 1px solid #e0e0e0;
				}
			}
		}
	}
}
</style>
