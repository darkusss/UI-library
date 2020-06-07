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
	search: {
		fields: ['name', 'surname'],
		filters: [
			v => v.toLowerCase(),
			v => toKeyboardLayout(v, 'ru'),
			v => toKeyboardLayout(v, 'en')
		]
	}
};

function toKeyboardLayout(str, language) {
	let associativeArray = {
		"q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
		"i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
		"d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
		";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
		"n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
	};
	return str.replace(/[A-z\/,.;\]\[]/g, function (x) {
		return associativeArray[x];
	});

}

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

table.DataTable(config1, users, sorts, 'table-search');

const buttons = document.querySelectorAll('[class^="fas fa-sort"]');

buttons.forEach(button => {
	button.addEventListener('click', () => {
		table.changeSort(buttons, button, config1.defaultSort, sorts);
		const sortUsers = table.sortBy(config1.defaultSort, users, sorts);
		table.renderTable(parent, sortUsers);
	})
})

