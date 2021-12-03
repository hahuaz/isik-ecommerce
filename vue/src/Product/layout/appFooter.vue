<template>
	<div class="outerContainerFooter">
		<footer class="p-8 pb-3">
			<p class="pb-1 text-lg text-lightOrange">
				Tercihinizde memnun kalcaksınız...
			</p>
			<div
				class="flex p-4 pb-0 border-t border-black justify-around text-lightOrange items-start"
			>
				<div style="grid-area:contact" class="text-center">
					<p class="pb-2 font-medium text-xl">destek@isikavm.com</p>
					<p class="p-2 font-medium text-xl">0555 344 33 44</p>
					<a id="callBtn" href="tel:+90535-302-90-68">
						<i class="fas fa-phone-alt fa-lg"></i>HEMEN ARA
					</a>
				</div>
				<div>
					<p>Şehit Abdullah Çavuş Mahallesi</p>
					<p>Alparslan Türkeş Bulvarı</p>
					<p>Zarif Oğlu Apartmanı Altı</p>
					<p>No:53 Kahramanmaras</p>
				</div>

				<div class>
					<p class="text-1xl pl-2">Sosyal medyada bizi takip edin.</p>
					<a href="https://www.instagram.com/isik_avm/?hl=tr">
						<i class="fab fa-instagram text-4xl text-red-700 m-3 mr-4"></i>
					</a>
					<a
						href="https://www.facebook.com/ISIKAVMKAHRAMANMARAS/?ref=page_internal "
					>
						<i class="fab fa-facebook-square text-4xl text-blue-700 mr-4"></i>
					</a>
					<a
						href="https://www.google.com/maps/place/IŞIK+AVM/@37.5885358,36.8836345,15z/data=!4m2!3m1!1s0x0:0x209ba1de925603ee?sa=X&ved=2ahUKEwj83sXD78TqAhU4RhUIHUQXC4cQ_BIwE3oECBcQCA"
					>
						<i class="fas fa-map-marked-alt text-4xl text-green-700"></i>
					</a>
				</div>
			</div>
			<p class="text-center">
				&copy;2020 Tüm hakları saklıdır. -
				<a href class="underline">isikavm.com</a>
			</p>
		</footer>
	</div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.outerContainerFooter {
	padding-top: 6rem;
	width: 100%;
	background: #ffefba; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to bottom,
		white,
		#d1ccbc 85%,
		#cca763
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to bottom,
		white,
		#d1ccbc 85%,
		grey
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	#callBtn {
		color: white;
		background-color: black;
		text-decoration: none;
		padding: 8px;
		display: inline-block;
		margin: 10px 0 0;
		transition: 0.3s ease-in-out all;
		border-radius: 5px;
		&:hover {
			transform: scale(1.1);
		}
		i {
			margin-right: 5px;
		}
	}
}
</style>
