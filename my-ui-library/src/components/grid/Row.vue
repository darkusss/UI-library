<template>
	<div class="ui-row">
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Row',
	});

</script>

<style scoped>
	.ui-row {
		display: flex;
		flex-flow: row wrap;
    margin: auto;
		padding: 15px 0;
	}

</style>
