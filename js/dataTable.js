import {DataTable} from "./table.js";

const config1 = {
	parent: '#user-table',
	columns: [
		{
			title: '№',
			value: '_index'
		},
		{
			title: 'Имя',
			value: 'name',
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
			v => toKeyboardLayout(v.toLowerCase())
		]
	}
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
	},
	{
		id: 30052,
		name: 'Петр',
		surname: 'Петрович',
		age: 13
	},
	{
		id: 30053,
		name: 'Лев',
		surname: 'Толстой',
		age: 20
	},
	{
		id: 30054,
		name: 'Билл',
		surname: 'Гейтс',
		age: 50
	},
];

function toKeyboardLayout(str) {
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

DataTable(config1, users);





