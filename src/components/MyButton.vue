<template>
	<div>
		<button
				@click="$emit('click')"
				class="btn"
				:class="'btn-' + color + ' btn-' + size"
				:style="{'border-radius': rounded + 'px'}"
		>
			<slot></slot>
		</button>
	</div>
</template>
<script lang="ts">
	import Vue from 'vue';

	type Color = 'secondary' | 'dark' | 'primary' | 'info' | 'warning' | 'success' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	export default Vue.extend({
		name: 'MyButton',
		props: {
			size: {
				type: String as () => Size,
				default: 'md',
			},
			color: {
				type: String as () => Color,
				default: 'secondary',
			},
			rounded: {
				type: [Number, String],
				default: 0,
				validator: (value: number | string): boolean => +value >= 0,
			}
		},

	});
</script>

<style scoped lang="less">
  @primary-color: #007bff;
  @secondary-color: #6c757d;
  @success-color: #5cb85c;
  @info-color: #5bc0de;
  @warning-color: #ffc107;
  @danger-color: #dc3545;
  @dark-color: #343a40;
  @lighten-success: lighten(@success-color, 15%);

	.btn {
		margin: 10px 5px;
		display: inline-block;
		color: black;
		font-size: 1em;
		border: 1px solid transparent;
		cursor: pointer;
		padding: 10px 30px;
		text-decoration: none;
		transition: .2s linear;
	}

	@btn-names: dark, primary, secondary, success, danger, warning, info;
	@bg-colors: @dark-color, @primary-color, @secondary-color,
	@success-color, @danger-color, @warning-color, @info-color;
	@text-colors: white, white, white, white, white, @dark-color, white;

	each(@btn-names, {
	@index = 1;
		.btn-@{value} {
			.btn-style(extract(@bg-colors, @index), extract(@text-colors, @index));
		}
		.btn-@{value}:hover {
			.btn-style(extract(@bg-colors, @index), extract(@text-colors, @index));
			background: darken(extract(@bg-colors, @index), 10%);
		}

		.btn-outline-@{value} {
			.btn-style(white, extract(@bg-colors, @index));
			border: 1px solid extract(@bg-colors, @index);
		}
		.btn-outline-@{value}:hover {
			.btn-style(extract(@bg-colors, @index), extract(@text-colors, @index));
			transition: .2s linear;
		}

	@index = @index + 1;
	});



	.btn-sm {
		font-size: .8em;
	}

	.btn-lg {
		font-size: 1.2em;
	}

	.btn-style(@bg-color, @color: white) {
		background: @bg-color;
		color: @color;
	}

  button:disabled,
  button[disabled]{
	  border: 1px solid #999999;
	  background-color: #cccccc;
	  color: #666666;
  }
</style>
