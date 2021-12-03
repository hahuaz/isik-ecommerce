<template>
	<div>
		<buy-header anActive="payment" />

		<div class="outerContainer">
			<template v-if="status === 'success'">
				<div class="success">
					<i class="fas fa-check-double"></i>
					<p>Ödeme başarılı! Lütfen bekleyin...</p>
				</div>
			</template>
			<template v-else>
				<div class="fail">
					<i class="fas fa-exclamation-triangle"></i>
					<p>Ödeme başarısız! Lütfen bekleyin...</p>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import BuyHeader from "./BuyHeader.vue";
export default {
	components: {
		BuyHeader
	},
	data() {
		return {
			status: this.$route.query.status
		};
	},
	mounted() {
		if (this.status === "success") {
			this.$store.state.sepetProducts = [];
			setTimeout(() => {
				this.$router.replace({
					name: "Siparisler"
				});
			}, 3000);
			return;
		}

		setTimeout(() => {
			this.$router.replace({
				name: "Sepet"
			});
		}, 3000);
	}
};
</script>

<style scoped lang="scss">
.outerContainer {
	height: 500px;
	padding: 3rem;
	background-image: linear-gradient(
			rgba(255, 255, 255, 0.671),
			rgba(255, 255, 255, 0.726)
		),
		url("../../assets/img/sepetBackground.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	.success {
		text-align: center;
		color: rgb(61, 194, 34);
		i {
			font-size: 3rem;
			margin-bottom: 1rem;
		}
		p {
			font-size: 1.5rem;
			font-weight: bold;
		}
	}
	.fail {
		text-align: center;
		color: red;
		i {
			font-size: 3rem;
			margin-bottom: 1rem;
		}
		p {
			font-size: 1.5rem;
			font-weight: bold;
		}
	}
}
</style>
