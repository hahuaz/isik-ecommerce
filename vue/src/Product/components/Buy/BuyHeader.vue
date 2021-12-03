<template>
	<div class="outerContainerProcess">
		<ul>
			<li id="notBefore" :class="{ active: anActive === 'sepet' }">
				<p>SEPET</p>
			</li>
			<li :class="{ active: anActive === 'teslimatBilgi' }">
				<p>TESLİMAT BİLGİLERİ</p>
			</li>
			<li :class="{ active: anActive === 'payment' }"><p>ÖDEME VE ONAY</p></li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ["anActive"]
};
</script>

<style scoped lang="scss">
.outerContainerProcess {
	display: flex;
	justify-content: center;
	ul {
		list-style: none;
		display: flex;
		margin: 10px;
		li {
			background-color: #eee;
			&:first-child p::before {
				border-color: transparent !important;
			}
			p {
				word-spacing: 0.5rem;
				letter-spacing: 0.2rem;
				font-size: 1.2rem;
				line-height: 4rem;
				padding: 0 3rem;
				position: relative;
				&::before,
				&::after {
					content: " ";
					position: absolute;
					width: 0;
					height: 0;
					top: 0;
				}
				&::after {
					right: 0px;
					border-left: 0.7rem solid;
					border-top: 2rem solid;
					border-bottom: 2rem solid;
					border-color: #fff #eee #fff transparent;
				}
				&::before {
					left: 0px;
					border-left: 0.7rem solid;
					border-top: 2rem solid;
					border-bottom: 2rem solid;
					border-color: transparent #eee transparent #fff;
				}
			}
		}
		.active {
			background-color: #aba8a6 !important;
		}
	}
}
</style>
