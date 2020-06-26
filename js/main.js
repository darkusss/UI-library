import { DataTable, calculateAge, toKeyboardLayout } from "./table.js";
import { setModalButtonsEventListeners } from "./modal.js";

const config1 = {
	parent: '#user-table',
	columns: [
		{
			title: '№',
			value: '_index',
			visible: false,
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

async function start() {
	await DataTable(config1);
	setModalButtonsEventListeners();
}

start();



