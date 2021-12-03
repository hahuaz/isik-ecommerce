import vue from "vue";
import vueRouter from "vue-router";

import Landing from "../components/Landing/Landing.vue";

import Buy from "../components/Buy/Buy.vue";
import Sepet from "../components/Buy/Sepet.vue";
import Teslimat from "../components/Buy/Teslimat.vue";
import Onay from "../components/Buy/Onay.vue";

import Siparislerim from "../components/User/Siparislerim.vue";
import Hesabım from "../components/User/Hesabım.vue";
import BilgileriGuncelle from "../components/User/BilgileriGuncelle.vue";
import SifreGuncelle from "../components/User/SifreGuncelle.vue";

import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import Products from "../components/Products.vue";
import ProductDetails from "../components/ProductDetails.vue";

vue.use(vueRouter);

export default new vueRouter({
	mode: "history",
	routes: [
		{
			name: "Landing",
			path: "/",
			component: Landing
		},
		{
			name: "SignUp",
			path: "/kayit-ol",
			component: SignUp
		},
		{
			name: "SignIn",
			path: "/giris-yap",
			component: SignIn
		},
		{
			name: "Products",
			path: "/urunler/:type",
			component: Products
		},
		{
			name: "ProductDetails",
			path: "/urunler/:type/:_id",
			component: ProductDetails
		},
		{
			name: "Sepet",
			path: "/sepet",
			component: Buy /* navigate to buy which is parent of sepet */,
			children: [
				{
					path: "",
					component: Sepet
				},
				{
					path: "teslimat",
					component: Teslimat
				},
				{
					path: "onay",
					component: Onay
				}
			]
		},
		{
			name: "Siparislerim",
			path: "/siparislerim",
			component: Siparislerim
		},
		{
			name: "Hesabım",
			path: "/hesabim",
			component: Hesabım
		},
		{
			path: "/bilgileri-guncelle",
			component: BilgileriGuncelle
		},
		{
			path: "/sifre-guncelle",
			component: SifreGuncelle
		}
	]
});
