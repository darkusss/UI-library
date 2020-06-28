Vue.component('my-input', {
	props: {
		title: {
			type: String,
			default: 'Text',
			required: true
		},
		placeholder: {
			type: String,
			default: 'test',
			required: false
		},
		type: {
			type: String,
			default: 'text',
			required: false
		},
		required: {
			type: Boolean,
			default: false,
			required: true
		},
		validationRegExp: {
			type: RegExp
		},
		errorMessage: {
			type: String
		}
	},
	data() {
		return {
			invalidInput: false,
			invalidInputExpression: false
		}
	},
	methods: {
		invalid: function (event) {
			this.invalidInput = this.required && !event.target.value.trim();
			this.invalidInputExpression = !event.target.value.match(this.validationRegExp);
		},
		updateValue(value) {
			this.$emit('input', value);
		}
	},
	template: `
<label>{{title}} <span v-if="required">*</span>
  <input 
  	@blur="invalid"
		@input="updateValue($event.target.value)"
		:class="{'input-danger': invalidInput}"
		:placeholder="placeholder"
		:required="required"
		:type="type"
  >
  <div v-if="invalidInputExpression" style="color: red;">  {{errorMessage}}</div>
</label>
`
});
