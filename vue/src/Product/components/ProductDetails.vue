<template>
	<div class="outerContainerProductDetails">
		<nav-bar></nav-bar>
		<div v-if="isThereNoProduct">Böyle bir ürün yok...</div>
		<div v-else class="container">
			<div class="sidebar">
				<img
					:src="product.images[0]"
					alt="cant"
					@click="changeImg(0)"
					:class="{ activeBorder: activeImgIndex === 0 }"
				/>
				<img
					:src="product.images[1]"
					alt="cant"
					@click="changeImg(1)"
					:class="{ activeBorder: activeImgIndex === 1 }"
				/>
				<img
					:src="product.images[2]"
					alt="cant"
					@click="changeImg(2)"
					:class="{ activeBorder: activeImgIndex === 2 }"
				/>
			</div>
			<div class="imageContainer" id="ex1">
				<v-zoom :img="product.images[activeImgIndex]" magnify="1.3"></v-zoom>
			</div>
			<div class="details">
				<p class="name">{{ product.productName }}</p>
				<p>attract metin</p>
				<div class="priceContainer">
					<div class="discount" v-if="product.priceSchema.discount">
						<p>{{ product.priceSchema.discount }} TL</p>
						<p>indirim</p>
					</div>
					<div class="price">
						<p class="firstPrice" v-if="product.priceSchema.discount">
							{{ product.priceSchema.price }} TL
						</p>
						<p class="salePrice">
							{{ product.priceSchema.price - product.priceSchema.discount }} TL
						</p>
					</div>
				</div>
				<div class="actionButtons">
					<div class="quantity">
						<button @click="quantity--" :disabled="quantity === 1">
							&mdash;
						</button>
						<input type="text" v-model="quantity" readonly />
						<button @click="quantity++">&#xff0b;</button>
					</div>
					<button class="sepeteEkle" @click="InıtAddProductToSepet(product)">
						SEPETE EKLE
					</button>
				</div>

				<p class="ozellikP">Özellikler</p>
				<pre>{{ product.features }}</pre>

				<button
					class="text-white font-bold bg-red-600 p-1 rounded"
					v-if="admin"
					@dblclick="delProduct(product._id)"
				>
					ÜRÜNÜ SİL!
				</button>
				<p class="text-green-600 font-black" v-if="delStatus">
					{{ delStatus }}
				</p>
				<p class="text-red-600 font-black" v-if="delErr">Error:{{ delErr }}</p>
			</div>
		</div>
		<div class="attractContainer border-t border-grey border-b">
			<div class="attract">
				<i class="fas fa-headset"></i>
				<div>
					<p>7/24</p>
					<p>DESTEK</p>
				</div>
			</div>
			<div class="attract">
				<i class="fas fa-people-carry"></i>
				<div>
					<p>SAĞLAM</p>
					<p>ÜRÜN GARANTİSİ</p>
				</div>
			</div>
			<div class="attract">
				<i class="fas fa-shipping-fast"></i>
				<div>
					<p>HIZLI</p>
					<p>KARGO</p>
				</div>
			</div>

			<div class="attract">
				<i class="far fa-handshake"></i>
				<div>
					<p>MÜŞTERİ</p>
					<p>MEMNUNİYETİ</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from "./NavBar.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import vZoom from "vue-zoom";
export default {
	name: "ProductDetails",
	components: {
		NavBar,
		vZoom
	},
	data() {
		return {
			quantity: 1,
			admin: false,
			isThereNoProduct: null,
			delStatus: null,
			delErr: null,
			product: {
				images: [],
				priceSchema: {} /* u have to specify nesteds. to prevent "cannot read property of undefined" */,
				productName: ""
			},
			activeImgIndex: 0
		};
	},
	computed: {
		...mapGetters(["getUser"])
	},
	methods: {
		...mapActions(["addProductToSepet"]),
		InıtAddProductToSepet(product) {
			const newProduct = {
				...product,
				quantity: this.quantity
			};
			this.addProductToSepet(newProduct);
		},
		changeImg(index) {
			this.activeImgIndex = index;
		},
		async fetchProduct() {
			try {
				const type = this.$route.params.type;
				const _id = this.$route.params._id;
				const { data } = await axios.get(`/api/products/${type}/${_id}`);

				if (data.message === "Bu id ile ürün yok") {
					this.isThereNoProduct = true;
				} else {
					this.product = data;
				}
			} catch (error) {
				this.isThereNoProduct = true;
			}
		},

		async delProduct(id) {
			try {
				const check = confirm("Ürünü sileceksiniz.Emin misiniz?");
				if (check) {
					const { data } = await axios.delete(`/api/products/${id}`);
					this.delStatus = data.message;
					setTimeout(() => {
						this.$router.replace({
							name: "Landing"
						});
					}, 2000);
				}
			} catch (error) {
				this.delErr = error.message;
			}
		}
	},
	beforeCreate() {},
	created() {
		this.fetchProduct();

		if (this.getUser) {
			if (this.getUser.role === "admin") this.admin = true;
		}
	}
};
</script>

<style scoped lang="scss">
.outerContainerProductDetails {
	min-height: 500px;
	.container {
		padding: 30px;
		display: grid;
		grid-template-columns: 7rem 33rem 1fr;
		grid-template-rows: 700px;
		gap: 5px;
		.sidebar {
			display: grid;
			grid-template-rows: 7rem 7rem 7rem;
			gap: 1rem;
			img {
				width: 7rem;
				height: 7rem;
				border: 1px solid grey;
			}
			.activeBorder {
				border: 1px solid rgb(37, 238, 37);
			}
		}
		.imageContainer {
			img {
				height: 33rem;
				width: 33rem;
			}
		}
		.details {
			padding-left: 40px;
			.name {
				font-size: 2rem;
				font-weight: 900;
				border-bottom: 1px solid #e0e0e0;
			}
			.priceContainer {
				border-bottom: 1px solid #e0e0e0;
				margin: 10px 0;
				padding: 20px 0;
				display: flex;
				font-size: 1.2rem;
				.discount {
					text-align: center;
					font-weight: 900;
					margin: 10px;
					padding: 5px;
					background-color: rgb(187, 187, 187);
					font-size: 0.8rem;
				}
				.price {
					padding: 5px 0 10px 0;
					.firstPrice {
						color: red;
						font-size: 0.8em;
						text-decoration: line-through;
					}
					.salePrice {
						font-size: 1.5em;
						font-weight: 900;
					}
				}
			}
			.actionButtons {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 30px 0;
				border-bottom: 1px solid #e0e0e0;
				.quantity {
					display: flex;
					input {
						border: 1px solid black;
						padding: 3px 0;
						width: 40px;
						text-align: center;
					}
					button {
						cursor: pointer;
						width: 30px;
						color: white;
						background-color: black;
						border: 0;
					}
				}
				.sepeteEkle {
					position: relative;
					text-decoration: none;
					cursor: pointer;
					padding: 7px 20px;
					color: white;
					background-color: black;
					border: 3px solid black;
					transition: all 0.3s ease-in-out;
					&:hover {
						border: 3px solid grey;
						background-color: white;
						color: black;
					}
				}
			}
			.ozellikP {
				color: black;
				font-size: 1.2rem;
				font-weight: bold;
				margin: 10px 0;
			}
			pre {
				line-height: 24px;
				background-image: linear-gradient(180deg, #eee 50%, #fff 50%);
				background-size: 100% 48px;
			}
		}
	}
	.attractContainer {
		padding: 10px 0;
		display: flex;
		justify-content: space-around;
		.attract {
			i {
				font-size: 30px;
				margin-right: 8px;
			}
			display: flex;
			font-weight: bold;
			text-align: center;
			align-items: center;
			div p:last-child {
				font-size: 0.7rem;
			}
		}
	}
}
</style>
