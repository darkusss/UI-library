<template>
	<div class="ui-row">
		<slot></slot>
	</div>
</template>

<style scoped lang="less">
	.ui-row {
		display: flex;
		margin: 15px 0;

		&:first-child {
			margin: 0;
		}
	}

	@media (max-width: 550px) {
		.ui-row {
			flex-flow: column wrap;
			width: 100%;
		}
	}
</style>
