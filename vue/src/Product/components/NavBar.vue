<template>
	<div class="outerContainerNavBar">
		<nav class="navBar border-b border-grey px-10">
			<div id="newProducts">
				<router-link to="/yeniler">
					<i class="fas fa-tags mr-1"></i>
					<span class="text-blue-700 font-bold">YENİLER</span>
				</router-link>
			</div>
			<ul>
				<li>
					<p>SOFRA</p>
					<div class="dropDown">
						<div>
							<h3>BARDAKLAR</h3>
							<ul>
								<li>
									<router-link to="/urunler/cay-bardaklari"
										>Çay Bardakları</router-link
									>
								</li>
								<li>
									<router-link to="/urunler/kahve-fincani"
										>Kahve Takımı</router-link
									>
								</li>
								<li>
									<a href>Su Bardakları</a>
								</li>
							</ul>
						</div>
						<div>
							<h3>ÇATAL KAŞIK</h3>
							<ul>
								<li>
									<a href>Çatal Setleri</a>
								</li>
								<li>
									<a href>Kaşık Setleri</a>
								</li>
								<li>
									<a href>İkisi Bir arada</a>
								</li>
							</ul>
						</div>
						<div>
							<h3>YEMEK SETLERİ</h3>
							<ul>
								<li>
									<a href>12 Kişilik Yemek Seti</a>
								</li>
								<li>
									<a href>6 Kişilik Yemek Seti</a>
								</li>
								<li>
									<a href>Küçük Aileler İçin</a>
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li>
					<p>MUTFAK</p>
					<div class="dropDown">
						<div>
							<h3>PİŞİRME</h3>
							<ul>
								<li>
									<router-link to>Tencereler</router-link>
								</li>
								<li>
									<router-link to="/urunler/kahve-fincani">Tavalar</router-link>
								</li>
								<li>
									<a href>Borcamlar</a>
								</li>
							</ul>
						</div>
						<div>
							<h3>SAKLAMA KABLARI</h3>
							<ul>
								<li>
									<a href>300 ML KAPLAR</a>
								</li>
								<li>
									<a href>700 ML KAPLAR</a>
								</li>
								<li>
									<a href>+1500 ML KAPLAR</a>
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li>
					<p>MUTFAK ALETLERİ</p>
					<div></div>
				</li>
				<li>
					<p>EV & YAŞAM</p>
					<div></div>
				</li>
			</ul>

			<div id="sepet">
				<router-link to="/sepet">
					<div>
						<img src="./../assets/img/sepet.svg" alt />
						<span v-if="getSepetLength">{{ getSepetLength }}</span>
					</div>
					<p>SEPET</p>
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getSepetLength"])
	}
};
</script>

<style scoped lang="scss">
.navBar {
	z-index: 1111;
	position: relative;
	color: black;
	letter-spacing: 1.1px;

	display: flex;
	justify-content: space-between;
	align-items: stretch !important;

	height: 55px;

	> ul {
		width: fit-content;
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: stretch !important;

		li {
			padding: 3px 10px 5px;
			display: flex;
			align-items: center;
			&:hover {
				background-color: black;
			}
			&:hover div {
				visibility: visible;
				background-color: black;
			}
			&:hover p {
				color: white;
			}
			p {
				cursor: context-menu;
				display: inline-block;
				margin: auto 0;
				font-weight: bold;
			}
			a {
				cursor: pointer;
				display: inline-block;
				text-decoration: none;
				font-size: 20px;
				color: inherit;
				vertical-align: middle;
			}
			.dropDown {
				position: absolute;
				color: white;
				display: flex;
				justify-content: space-around;
				width: 100%;
				visibility: hidden;
				background: black;
				left: 0;
				top: 100%;

				a {
					color: white;
					font-size: 15px;
					padding: 4px 0;
					display: inline-block;
					text-align: left;
				}

				div {
					padding: 10px 30px;
					ul {
						li {
							list-style-type: none;
							padding: 3px 0; /* override dropdown li */
						}
					}
				}
			}
		}
	}
	#newProducts {
		display: grid;
		place-items: center;
		i {
			color: #ddbd94;
		}
	}
	#sepet {
		background-color: #ddbd94;
		a {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			font-weight: 900;
			font-size: 1.25rem;
			color: white;
			padding: 5px 10px;
			> div {
				position: relative;
				margin-right: 9px;

				span {
					font-size: 12px;
					background-color: black;
					border-radius: 50%;
					color: white;
					padding: 0 7px 2px;
					position: absolute;
					right: -10px;
					top: -6px;
					font-weight: 900;
				}
				img {
					position: relative;
					top: -3px;
					width: 33px;
					// color svg
					filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(58deg)
						brightness(120%) contrast(103%);
					transform: translateY(5px);
				}
			}

			p {
				line-height: -30px;
				transform: translateY(-3px);
			}
		}
	}
}
</style>
