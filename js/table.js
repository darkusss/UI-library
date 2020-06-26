import {getUsers, deleteUserById, updateUserById, addUserById, getUser} from './api.js'
import {openModal} from './modal.js';

const sorts = {
	no: 'fas fa-sort',
	ascending: 'fas fa-sort-up',
	descending: 'fas fa-sort-down'
};

const a = {};

const addUserButton = document.querySelector('#add-user');
const addUserModalId = addUserButton.dataset.modalTarget;
const updateUserModalId = '#update-user-popup';

async function DataTable(config, data = undefined) {
	const parent = document.querySelector(config.parent);

	const users = !data && config.apiUrl ? await getUsers(config.apiUrl) : [...data];

	if (config.search) createSearchField(parent);


	// const form = document.createElement('form');
	// form.name = 'myForm';
	// form.id = 'myForm';
	// const addUserForm = new FormData();

	const addUserPopUpWindow = createPopupWindow(addUserModalId.slice(1));
	const addUserPopupHeader = createAddUserPopupHeader('Введите данные');
	const addUserPopupBody = createAddUserPopupBody(config.columns, /*form*/);

	const onAddEventListener = () => {
		const popupDOMInputs = config.columns
			.filter(col => col.editable)
			.reduce((obj, col) => {
				const {value} = addUserPopupBody.querySelector(`[name=${col.value}]`);
				obj[col.value] = value;
				return obj;
			}, {});

		saveUser(config, table, popupDOMInputs, (user) => addUserById(config.apiUrl, user));
	}

	const addUserPopupFooter = createAddUserPopupFooter(addUserPopUpWindow, onAddEventListener);

	// popUpWindow.append(form);
	addUserPopUpWindow.append(addUserPopupHeader, addUserPopupBody, addUserPopupFooter);

	const userUpdatePopupWindow = createPopupWindow(updateUserModalId.slice(1));
	const updateUserPopupHeader = createAddUserPopupHeader('Введите данные');
	const updateUserPopupBody = createAddUserPopupBody(config.columns, /*form*/);
	const updateUserPopupFooter = createAddUserPopupFooter(userUpdatePopupWindow, undefined);

	// popUpWindow.append(form);
	userUpdatePopupWindow.append(updateUserPopupHeader, updateUserPopupBody, updateUserPopupFooter);

	parent.append(addUserPopUpWindow, userUpdatePopupWindow);


	const table = await createTable(config.apiUrl, config, parent);
}

async function createTable(apiURL, config, parent) {

	if (!config) return;

	const table = document.createElement('table');
	parent.append(table);

	createTableHead(config, table);

	let users = await getUsers(apiURL);

	const sortType = typeof users[0][config.defaultSort.field];
	const sortValue = config.defaultSort.field;
	const sortState = sorts[config.defaultSort.state];
	const sortUsers = sortBy(sortType, sortValue, sortState, users);

	renderTableBody(config.columns, table, sortUsers, apiURL);

	const buttons = table.tHead.querySelectorAll('button');
	const input = parent.querySelector('input');

	buttons.forEach(btn => {
		btn.addEventListener('click', async () => {
			const sortType = currentSortType(parent, btn);
			users = await getUsers(apiURL);
			const sortUsers = sortBy(btn.dataset.type, btn.dataset.value, sortType, users);
			renderTableBody(config.columns, table, sortUsers, apiURL);
		});
	});

	input.addEventListener('input', async () => {
		users = await getUsers(apiURL);
		const filterUser = findBy(users, config.search, input.value);
		renderTableBody(config.columns, table, filterUser, apiURL);
	});
	return table;
}

function createTableHead(config, table) {
	const thead = document.createElement('thead');
	const row = document.createElement('tr');

	table.append(thead);
	thead.append(row);

	config.columns.forEach(col => {
		const cell = document.createElement('th');
		row.append(cell);
		cell.innerText = col.title;

		if (col.type === 'number') {
			cell.classList.add('align-right');
		}
		if (col.sortable) {
			const type = !col.type ? 'string' : col.type;
			const sortClass = col.value === config.defaultSort.field ? sorts[config.defaultSort.state] : sorts['no'];
			cell.innerHTML += `<button type="button" data-type="${type}" data-value="${typeof col.value === 'function' ? 'function' : col.value}"><i class="${sortClass}"></i></button>`;
		}
	});
}

function renderTableBody(cols, table, users, apiURL = '') {
	let tbody = table.querySelector('tbody');

	if (tbody) {
		tbody.innerHTML = '';
	} else {
		tbody = document.createElement('tbody');
	}

	table.append(tbody);

	users.forEach((user, _index) => {
		const row = document.createElement('tr');
		tbody.append(row);
		let cell = document.createElement('td');
		row.append(cell);

		cell.innerText = _index + 1;

		cols.forEach((col) => {
			if (col.visible) {
				cell = document.createElement('td');
				row.append(cell);
				cell.innerText = user[col.value];
				if (col.type === 'number') {
					cell.classList.add('align-right');
				}
				if (typeof col.value === 'function') {
					cell.innerText = col.value(user);
				} else if (col.value === 'avatar') {
					cell.innerHTML = `<img width="64px" height="64px" src="${user[col.value]}" alt="image" />`;
					cell.classList.add('align-center');
				}
				if (col.value === 'acts') {
					cell.innerHTML = `<button class="btn btn-danger" data-id="${user.id}">Удалить</button>`;
					cell.innerHTML += `<button class="btn btn-warning" data-id="${user.id}" data-modal-target="${updateUserModalId}">Редактировать</button>`;
					const deleteUserButton = cell.querySelector('.btn-danger');
					const updateUserButton = cell.querySelector('.btn-warning');
					addDeleteUserListener(deleteUserButton, apiURL, cols, table, user.id);
					addUpdateUserListener(updateUserButton, apiURL, cols, table);
					cell.classList.add('align-center');
				}
			}
		});
	});
	const updateUserPopup = document.querySelector(updateUserModalId);
	const saveUserButton = updateUserPopup.querySelector('[data-close-button]');
	const config = {
		apiUrl: apiURL,
		columns: cols
	};

	saveUserButton.addEventListener('click', async () => {
		const popupDOMInputs = cols
			.filter(col => col.editable)
			.reduce((obj, col) => {
				const {value} = updateUserPopup.querySelector(`[name=${col.value}]`);
				obj[col.value] = value;
				return obj;
			}, {});

		await saveUser(config, table, popupDOMInputs, async (user) => {
			await updateUserById(config.apiUrl, a.userId, user);
		});
	});
}

function createPopupWindow(id) {
	const popupWindow = document.createElement('div');

	popupWindow.classList.add('modal');
	popupWindow.id = id;

	return popupWindow;
}

function createAddUserPopupHeader(headerText) {
	const addUserHeader = document.createElement('div');
	const addUserHeaderText = document.createElement('h2');


	addUserHeader.classList.add('modal-header');

	addUserHeaderText.innerText = headerText;
	addUserHeader.append(addUserHeaderText);

	return addUserHeader;
}

function createAddUserPopupBody(columns) {
	const addUserBody = document.createElement('div');
	// addUserBody.append(form);
	addUserBody.classList.add('modal-body');

	columns.forEach(col => {
		if (col.editable) {
			const {label, input} = createInputField(col);
			addUserBody.append(label, input);
		}
	});

	return addUserBody;
}

function createAddUserPopupFooter(popupWindow, onSaveEventListener) {
	const addUserFooter = document.createElement('div');
	const saveButton = document.createElement('button');
	const closeButton = document.createElement('button');

	addUserFooter.classList.add('modal-footer');

	saveButton.classList.add('btn', 'btn-outline-success');
	saveButton.textContent = 'Сохранить';
	if (onSaveEventListener)
		saveButton.addEventListener('click', (event) => {
			// event.preventDefault();
			onSaveEventListener();
		});
	saveButton.dataset.closeButton = '';

	closeButton.classList.add('btn', 'btn-outline-danger');
	closeButton.textContent = 'Отменить';
	closeButton.dataset.closeButton = '';

	addUserFooter.append(saveButton, closeButton);

	return addUserFooter;
}

function createInputField(col) {
	const label = document.createElement('label');
	const input = document.createElement('input');

	input.name = col.value;
	input.type = col.value === 'birthday' ? 'date' : 'text';
	if (col.value !== 'avatar')
		input.required = true;

	label.htmlFor = col.value;
	label.textContent = col.title + ':';

	return {label, input};
}

function createSearchField(parent) {
	const div = document.createElement('div');
	const input = document.createElement('input');
	const searchId = 'table-search';

	input.type = 'text';

	div.id = searchId;
	div.classList.add(searchId);
	div.append(input);

	parent.append(div);
}

function addDeleteUserListener(button, apiURL, cols, table, id) {
	button.addEventListener('click', async () => {
		const updatedUsers = await deleteUserById(apiURL, id).then(() => getUsers(apiURL));
		renderTableBody(cols, table, updatedUsers, apiURL);
	});
}

function addUpdateUserListener(updateUserButton, apiURL) {
	const updateUserPopUp = document.querySelector(updateUserModalId);

	updateUserButton.addEventListener('click', async () => {
		a.button = updateUserButton;
		a.userId = updateUserButton.dataset.id;
		const updateUserInputsDom = updateUserPopUp.querySelectorAll('input');
		const updateUserInputs = {};
		const currentUser = await getUser(apiURL, updateUserButton.dataset.id);
		updateUserInputsDom.forEach(input => {
			if (input.name !== 'birthday') {
				updateUserInputs[input.name] = (input.value = currentUser[input.name]);
			} else {
				updateUserInputs[input.name] = (input.value = currentUser[input.name].split('T')[0]);
			}
		});
		openModal(updateUserPopUp);
	});

}

function currentSortType(parent, button) {
	const icons = parent.querySelectorAll('button i');
	const currentIcon = button.querySelector('i');
	const currentSortIcon = currentIcon.getAttribute('class');

	icons.forEach((icon) => {
		icon.className = sorts['no'];
	});

	switch (currentSortIcon) {
		case 'fas fa-sort':
			currentIcon.className = sorts['ascending'];
			break;
		case 'fas fa-sort-up':
			currentIcon.className = sorts['descending'];
			break;
		case 'fas fa-sort-down':
			currentIcon.className = sorts['no'];
			break;
	}

	return currentIcon.className;
}

function sortBy(type, value, sortType, data) {
	const sortData = [...data];
	// sortBy depends on sortType - it's not pure function
	const coef = sortType.includes('up') ? 1
		: sortType.includes('down') ? -1
			: 0;

	if (type === 'number') {
		sortData.sort((u1, u2) => {
			if (value === 'function') {
				return (calculateAge(u1.birthday) - calculateAge(u2.birthday)) * coef;
			}
			return (u1[value] - u2[value]) * coef;
		});
	} else if (type === 'string') {
		sortData.sort((u1, u2) => {
			return (u1[value].localeCompare(u2[value])) * coef;
		});
	}
	return sortData;
}

function findBy(users, {fields, filters}, query) {
	if (query === "") return users;

	return users.filter((user) => {
		return fields.filter((field) => {
			return filters.filter((searchFilter) => {
				return searchFilter(user[field]).includes(searchFilter(query));
			}).length
		}).length
	});
}

async function saveUser({apiUrl, columns}, table, inputs, dataManipulation) {
	const newUser = {
		...inputs
	};

	for (const prop in newUser) {
		if (!newUser[prop])
			return;
	}
	try {
		await dataManipulation(newUser);
		const copyUsers = await getUsers(apiUrl);
		renderTableBody(columns, table, copyUsers, apiUrl);
	} catch (error) {
		console.log(error);
	}

}

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
	return str.replace(/[A-z\/,.;\]\[]/g, (x) => {
		return associativeArray[x];
	});
}

export {DataTable, calculateAge, toKeyboardLayout};
