import * as table from "./table.js";

const config1 = {
	parent: '#user-table',
	columns: [
		{
			title: '№',
			value: '_index'
		},
		{
			title: 'Имя',
			value: 'name'
		},
		{
			title: 'Фамилия',
			value: 'surname',
			sortable: true
		},
		{
			title: 'Возраст',
			value: 'age',
			type: 'number',
			sortable: true
		},
	],
	// type: no, ascending, descending
	// field: surname, age
	defaultSort: {
		field: 'age',
		type: 'no'
	},
};

const users = [
	{
		id: 30050,
		name: 'Вася',
		surname: 'Петров',
		age: 12
	},
	{
		id: 30051,
		name: 'Вася',
		surname: 'Васечкин',
		age: 15
	}
];

const sorts = {
	no: 'fas fa-sort',
	ascending: 'fas fa-sort-up',
	descending: 'fas fa-sort-down'
};


const parent = document.querySelector(config1.parent);

table.DataTable(config1, users, sorts);

const buttons = document.querySelectorAll('[class^="fas fa-sort"]');

buttons.forEach(button => {
	button.addEventListener('click', () => {
		table.changeSort(buttons, button, config1.defaultSort, sorts);
		const sortUsers = table.sortBy(config1.defaultSort, users, sorts);
		table.renderTable(parent, sortUsers);
	})
})

