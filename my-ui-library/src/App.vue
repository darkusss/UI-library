<template>
  <div id="app">
		<Row>
			<Column>1 of 3</Column>
			<Column>2 of 3</Column>
			<Column>3 of 3</Column>
		</Row>
  </div>
</template>
<script>
	import Row from '@/components/grid/Row';
	import Column from '@/components/grid/Column';

	export default {
		name: 'App',
		components: {
			Row,
			Column,
		},
		data () {
			return {
				cols: '12'
			};
		},
	}
</script>

<style lang="less">
</style>
