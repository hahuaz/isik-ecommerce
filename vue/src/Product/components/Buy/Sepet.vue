<template>
	<div class="outerContainer">
		<template v-if="!getSepetLength">
			<div class="emptySepet">
				<p>Sepetiniz boş gibi.</p>
				<p>Haydi alışverişe...</p>
			</div>
		</template>
		<template v-else>
			<buy-header anActive="sepet" />

			<ul class="customHead">
				<li>Ürün Bilgisi</li>
				<li>Miktar</li>
				<li>Birim Fiyat</li>
				<li>Ara Toplam</li>
				<li>Sil</li>
			</ul>

			<div
				class="singleProduct"
				v-for="(product, i) in getProductsInSepet"
				:key="i"
			>
				<div class="infoContainer inline-block">
					<router-link :to="'/products/' + product.type + '/' + product._id">
						<img :src="product.images[0]" alt />
						<p class="text-center text-2xl">{{ product.productName }}</p>
					</router-link>
				</div>
				<div>
					<p class="text-3xl font-medium inline-block">
						{{ product.quantity }}
					</p>
					<span>adet</span>
				</div>
				<div>
					<p
						class="text-red-700 line-through text-1xl inline-block mr-1"
						v-if="product.priceSchema.discount"
					>
						{{ product.priceSchema.price }} TL
					</p>
					<p class="text-black-900 font-medium text-3xl netPrice">
						{{ product.priceSchema.price - product.priceSchema.discount }} TL
					</p>
				</div>
				<p class="text-black-900 font-black text-3xl">
					{{
						quantityXPrice(
							product.priceSchema.price,
							product.priceSchema.discount,
							product.quantity
						)
					}}
					TL
				</p>
				<div>
					<button class="delProduct" @click="delProductFromSepet(product._id)">
						X
					</button>
				</div>
			</div>
			<div class="total text-right" v-if="getProductsInSepet.length">
				<div>
					<p>Sepet Toplamı</p>
					<p>{{ totalPrice }} TL</p>
				</div>
				<div>
					<p>Kargo Ücreti</p>
					<p>10 TL</p>
				</div>
				<div>
					<p>Ödenecek Tutar</p>
					<p>{{ totalPrice + 10 }} TL</p>
				</div>
				<router-link to="/sepet/teslimat">SATIN AL</router-link>
			</div>
			<div class="safePay">
				<div class="safeString">
					<h1>BİLGİLERİNİZ BİZİMLE GÜVENDE</h1>
					<p>
						<i class="fas fa-check"></i>Sitemiz veri transferlerini SSL
						sertifikasıyla şifreler
					</p>
					<p>
						<i class="fas fa-check"></i>Kart bilgilerinizi, biz dahil, kimse
						göremez ve erişemez
					</p>
					<p>
						<i class="fas fa-check"></i>Kart bilgileriniz her hangi bir veri
						tabanında tutulmaz
					</p>
					<p>
						<i class="fas fa-check"></i>Ödeme, yerli türk şirketi iysico
						aracılığıyla yapılır
					</p>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BuyHeader from "./BuyHeader.vue";
export default {
	name: "Sepet",
	components: {
		BuyHeader
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getProductsInSepet", "getSepetLength"]),
		totalPrice() {
			const totalPrice = this.getProductsInSepet.reduce((t, product) => {
				return (
					t +
					(product.priceSchema.price - product.priceSchema.discount) *
						product.quantity
				);
			}, 0);
			return totalPrice;
		}
	},
	methods: {
		...mapActions(["delProductFromSepet"]),
		quantityXPrice(price, discount, quantity) {
			return (price - discount) * quantity;
		}
	}
};
</script>

<style scoped lang="scss">
.outerContainer {
	.customHead {
		list-style: none;
		display: flex;
		justify-content: space-around;
		padding: 15px 20px 3px 20px;
		border-bottom: 1px solid #e0e0e0;
		display: grid;
		grid-template-columns: 250px 1fr 1fr 1fr 1fr;
		text-align: center;
	}
	.emptySepet {
		margin-top: 1rem;

		text-align: center;
		font-weight: bolder;
		font-size: 1.5rem;
		min-height: 500px;
		background-image: linear-gradient(
				rgba(255, 255, 255, 0.2),
				rgba(255, 255, 255, 0.2)
			),
			url("../../assets/img/empty.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		p {
			font-weight: bold;
			font-size: 2rem;
			color: white;
			text-align: right;
			padding: 4rem 4rem 0 0;
		}
	}
	.singleProduct {
		background-image: linear-gradient(
				rgba(255, 255, 255, 0.85),
				rgba(255, 255, 255, 0.85)
			),
			url("../../assets/img/sepetBackground.jpg");
		background-size: cover;
		background-repeat: no-repeat;

		margin: 5px 10px 10px;
		padding: 10px 20px;
		border-bottom: 1px solid #e0e0e0e0;
		border-top: 1px solid #e0e0e0e0;

		display: grid;
		grid-template-columns: 250px 1fr 1fr 1fr 1fr;
		text-align: center;
		align-items: center;
		.infoContainer {
			img {
				width: 250px;
				height: 250px;
			}
			p {
				padding-bottom: 3px;
			}
		}
		span {
			background-color: #e0e0e0e0;
			padding: 0 3px 3px;
			border-radius: 5px;
			font-size: 0.75rem;
			margin-left: 0.5rem;
		}
		.netPrice {
			margin-top: -10px;
		}
		.delProduct {
			font-size: 1.3rem;
			color: white;
			background-color: rgb(199, 199, 199);
			padding: 0 0.5rem 0.5rem;
			line-height: 1.5rem;
			font-weight: bolder;
		}
	}

	.total {
		margin-bottom: 5rem;

		padding: 10px;
		align-self: flex-start;
		p {
			text-align: left;
			display: inline-block;
			width: 10rem;
			padding: 5px 10px;
			border: 1px solid #e0e0e0e0;

			color: black;
		}
		a {
			text-align: center;
			color: white;
			background-color: red;
			width: 20rem;
			line-height: 3rem;
			display: block;
			margin-left: auto;
			font-size: 1.4rem;
			margin-top: 0.5rem;
		}
	}

	.safePay {
		margin: 1rem 0 1rem;
		padding: 1rem;
		background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			url("../../assets/img/safe.jpg");
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		justify-content: flex-end;
		align-items: center;

		height: 400px;
		.safeString {
			font-size: 1.2rem;
			h1 {
				color: white;
				border-bottom: 1px solid white;
				display: inline-block;
				font-weight: bold;
				margin: 10px 0;
			}
			p {
				color: white;
				padding: 5px 0;
				i {
					margin-right: 5px;
				}
			}
		}
	}
}
</style>
