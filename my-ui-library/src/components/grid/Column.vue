<template>
	<div class="col-style" :class="{['col-' + cols]: cols}">
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Column',
    props: {
			cols: {
				type: String,
			},
		},
	});
</script>

<style scoped lang="less">
	@primary-color: #cecece;

	.col-style {
		background-color: @primary-color;
		border: 1px solid darken(@primary-color, 20%);
		padding: 15px;
    flex-grow: 1;
    flex-shrink: 1;
	}

	.generate-columns(12);

	.generate-columns(@n, @i: 1) when (@i =< @n) {
		.col-@{i} {
			flex-basis: (100% / @n * @i);
		}

		.generate-columns(@n, (@i + 1));
	}
</style>
