<template>
	<div id="app">
		<header class="header">
			<h1>Tiny UI library</h1>
		</header>
		<main>
			<section class="section">
				<h2 class="section-brand">Buttons</h2>
				<div class="section-inner">
					<div class="row">
						<h3>Type</h3>
						<MyButton @click="trigger">Button</MyButton>
						<MyButton
							v-for="(color, idx) in colors"
							:key="idx"
							:color="color"
						>
							Button
						</MyButton>
					</div>
					<div class="row">
						<h3>Sizing</h3>
						<MyButton
							v-for="(size, idx) in sizes"
							:key="idx"
							:size="size">
							Button
						</MyButton>
					</div>
				</div>
			</section>
			<section class="section">
				<h2 class="section-brand">Grid</h2>
				<div class="section-inner">
					<MyButton>123</MyButton>
					<MyButton>123</MyButton>
					<MyButton>123</MyButton>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
	// @ is an alias to /src
	import MyButton from '@/components/MyButton.vue';

	export default {
		name: 'Home',
		components: {
			MyButton,
		},
		data() {
			return {
				colors: ['danger', 'success', 'outline-primary'],
				sizes: ['sm', 'md', 'lg'],
			};
		},
		methods: {
			trigger: function () {
				console.log(`You just trigger me`);
			}
		}
	};
</script>

<style lang="less">
	@primary-color: #007bff;
	@success-color: #5cb85c;
	@info-color: #5bc0de;
	@warning-color: #ffc107;
	@danger-color: #dc3545;
	@dark-color: #343a40;
	@lighten-success: lighten(@success-color, 15%);

	*,
	*:before,
	*:after {
		margin: 0;
		padding: 0;
	}

	body {
		font-family: "Roboto Light", sans-serif;
	}

	#app {
		background-color: @success-color;
		color: @dark-color;

		main {
			min-height: 100vh;

			.section {

				padding: 50px;

				.section-brand {
					color: @success-color;
					background: @dark-color;
					box-shadow: 8px -4px 8px 1px rgba(@dark-color,.5);

					padding: 1rem 2.5rem;

					border: 1px solid @dark-color;
					border-radius: 0 16px;
				}

				.section-inner {
					width: 90%;

					background: @lighten-success;

					margin: 10px auto 0;
					padding: .5rem;

					.row {
						width: 100%;

						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;

						h3 {
							width: 100%;

							padding: 10px 0 5px;

							border-bottom: 1px solid @dark-color;
						}
					}
				}
			}
		}
	}
</style>
