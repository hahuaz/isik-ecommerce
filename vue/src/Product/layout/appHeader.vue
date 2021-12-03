<template>
	<div class="outerContainerHeader border-b">
		<full-loading :show="loadingShow" label="Yükleniyor..."> </full-loading>
		<header>
			<ul class="mx-2  px-2 flex items-center text-lg  ">
				<li class="mr-auto p-2">
					<router-link to="/"
						><img
							src="../assets/img/logo.jpg"
							class="w-20"
							alt="can't find logo"
						/>
					</router-link>
				</li>
				<template v-if="!authenticated">
					<li class="py-1 px-2 border-r border-grey">
						<router-link to="/kayit-ol">Kayıt Ol</router-link>
					</li>
					<li class="py-1 px-2 ">
						<router-link to="/giris-yap">Giriş Yap</router-link>
					</li>
				</template>
				<template v-else>
					<li class="py-1 px-3 border-r border-grey">
						<i class="fas fa-cubes pr-1 text-xl"></i>
						<router-link to="/siparislerim">Siparişlerim</router-link>
					</li>
					<li class="py-1 px-3 border-r border-grey">
						<i class="fas fa-user pr-1 text-xl"></i>
						<router-link to="/hesabim">Hesabım</router-link>
					</li>
					<li class="py-1 px-3">
						<router-link @click.native="handleSignOut" to="/"
							>Çıkış Yap</router-link
						>
					</li>
				</template>
			</ul>
		</header>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FullLoading from "vue-full-loading";

export default {
	name: "Log",
	components: {
		FullLoading
	},
	data() {
		return {
			loadingShow: false
		};
	},
	computed: {
		...mapGetters(["authenticated", "getUser"])
	},
	methods: {
		...mapActions(["signOut"]),
		handleSignOut() {
			this.signOut();
			this.loadingShow = true;
			setTimeout(async () => {
				this.loadingShow = false;

				/* catch reduntant err */
				this.$router.replace({ name: "Landing" }).catch(() => {});
			}, 500);
		}
	}
};
</script>

<style lang="scss" scoped>
.outerContainerHeader {
}
</style>
