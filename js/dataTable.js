import {DataTable} from "./table.js";

const config1 = {
	parent: '#user-table',
	columns: [
		{
			title: '№',
			value: '_index',
			editable: false
		},
		{
			title: 'Дата рождения',
			value: 'birthday',
			visible: true,
			editable: true
		},
		{
			title: 'Имя',
			value: 'name',
			visible: true,
			editable: true
		},
		{
			title: 'Фамилия',
			value: 'surname',
			visible: true,
			sortable: true,
			editable: true
		},
		{
			title: 'Изображение',
			value: 'avatar',
			visible: true,
			editable: true
		},
		{
			title: 'Возраст',
			value: (user) => calculateAge(user.birthday),
			type: 'number',
			visible: true,
			sortable: true,
			editable: false
		},
		{
			title: 'Действия',
			value: 'acts',
			visible: true,
			editable: false
		}
	],
	// type: no, ascending, descending
	// field: surname, age
	defaultSort: {
		field: 'age',
		state: 'no'
	},
	search: {
		fields: ['name', 'surname'],
		filters: [
			v => toKeyboardLayout(v.toLowerCase())
		]
	},
	apiUrl: 'https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/participants'
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

function calculateAge(birthday) {
	const today = new Date();
	const birthDate = new Date(birthday);
	const m = today.getMonth() - birthDate.getMonth();
	let age = today.getFullYear() - birthDate.getFullYear();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

function toKeyboardLayout(str) {
	const associativeArray = {
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

async function start() {
	console.log('table');
	await DataTable(config1);

	const openModalButtons = document.querySelectorAll('[data-modal-target]');

	const inputDate = document.querySelector('#birthday');
	inputDate.max = new Date().toISOString().split("T")[0];
}

start();






