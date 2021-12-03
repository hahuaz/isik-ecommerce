<template>
	<div class="outerContainerHesabim">
		<nav-bar></nav-bar>

		<div class="auto mt-1">
			<div class="container">
				<div class="detailsContainer">
					<div class="imageContainer">
						<i class="fas fa-portrait"></i>
					</div>
					<div class="details">
						<p>
							<span>Kullanıcı adı:</span>
							<span>{{ getUser.userName }}</span>
						</p>
						<p>
							<span>Kullanıcı soyadı:</span>
							<span>{{ getUser.userSurname }}</span>
						</p>
						<p>
							<span>E-mail:</span>
							<span>{{ getUser.email }}</span>
						</p>
						<p>
							<span>Telefon no:</span>
							<span>{{ getUser.phone || "Bilgilerinizi güncelleyin" }}</span>
						</p>
						<p>
							<span>TC:</span>
							<span>{{ getUser.tc || "Bilgilerinizi güncelleyin" }}</span>
						</p>
						<p>
							<span>Ürün teslim adresi:</span>
							<span>{{ getUser.adress || "Bilgilerinizi güncelleyin" }}</span>
						</p>
					</div>
				</div>
				<div class="navButtons">
					<router-link to="/bilgileri-guncelle">
						<i class="fas fa-user-edit"></i>
						<span>Bilgileri güncelle</span>
					</router-link>
					<router-link to="/sifre-guncelle">
						<i class="fas fa-key"></i>
						<span>Şifre güncelle</span>
					</router-link>
				</div>

				<router-view></router-view>
				<p class="securityDescription">
					Tüm bilgileriniz bizimle güvendedir. Sitemiz, veri transferlerini SSL
					sertifikasıyla şifrelemektedir. Yapacağınız alışverişlerde kredi kartı
					bilgilerinize, biz dahil, kimse erişemez.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from "../NavBar.vue";

import { mapGetters } from "vuex";
export default {
	components: { NavBar },
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getUser"])
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.auto {
	height: 500px;
	width: 100%;
	background-image: linear-gradient(
			rgba(200, 200, 200, 0.5),
			rgba(200, 200, 200, 0.5)
		),
		url("../../assets/img/userDetailsBackground.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	.container {
		padding: 60px 0 0;
		width: min-content;
		margin: 0 auto;

		.detailsContainer {
			width: fit-content;
			display: flex;
			background-color: rgba(200, 200, 200, 0.2);
			padding: 10px;
			border-radius: 10px;
			font-size: 0.9rem;
			.imageContainer {
				padding: 10px;
				border-radius: 10px;
				i {
					font-size: 200px;
				}
			}
			.details {
				width: 300px;
				span:nth-child(even) {
					font-weight: bold;
				}
				p {
					padding: 5px;
				}
				span:nth-child(odd) {
					background-color: rgba(189, 189, 189, 0.4);
					border-radius: 5px;
					padding: 0 5px 5px;
					margin-right: 5px;
				}
			}
		}
		.navButtons {
			display: flex;
			justify-content: space-around;
			a {
				width: 110px;
				color: white;
				background-color: black;
				text-decoration: none;
				padding: 7px 2px 14px;
				margin: 10px;
				border-radius: 5px;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 0.8rem;

				i {
					font-size: 18px;
					margin-right: 5px;
				}
			}
		}

		.securityDescription {
			font-size: 0.9rem;
		}
	}
}
</style>
