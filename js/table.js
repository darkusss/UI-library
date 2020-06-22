import {closeModal} from './modal.js';

const sorts = {
	no: 'fas fa-sort',
	ascending: 'fas fa-sort-up',
	descending: 'fas fa-sort-down'
};

async function DataTable(config, data) {
	const parent = document.querySelector(config.parent);
	const addUserButton = document.querySelector('#add-user');
	const modalId = addUserButton.dataset.modalTarget.slice(1);

	const users = !data && config.apiUrl ? await getData(config.apiUrl) : [...data];

	if (config.search) createSearchField(parent);
	
	const table = await createTable(config.apiUrl, config, parent);

	const popUpWindow = createPopupWindow(modalId);
	const addUserPopupHeader = createAddUserPopupHeader('Введите данные');
	const addUserPopupBody = createAddUserPopupBody(config.columns);

	const buttonEventListeners = {
		onSaveEventListener: () => {
			const popupDOMInputs = {};

			config.columns.forEach(column => {
				if (column.editable) {
					const { value } = document.getElementById(column.value);
					popupDOMInputs[column.value] = value;
				}
			});

			saveUser(popUpWindow, config.apiUrl, table, users, popupDOMInputs, config.columns)
		},
		onCloseEventListener: () => closeModal(popUpWindow)
	};

	const addUserPopupFooter = createAddUserPopupFooter(popUpWindow, buttonEventListeners);

	popUpWindow.append(addUserPopupHeader, addUserPopupBody, addUserPopupFooter);

	parent.append(popUpWindow);
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

	addUserHeaderText.textContent = headerText;
	addUserHeader.append(addUserHeaderText);

	return addUserHeader;
}

function createAddUserPopupBody(columns) {
	const addUserBody = document.createElement('div');
	console.log(1);
	addUserBody.classList.add('modal-body');

	columns.forEach(col => {
		if (col.editable) {
			addUserBody.append(createInputField(col));
		}
	});

	return addUserBody;
}

function createAddUserPopupFooter(popupWindow, {onSaveEventListener, onCloseEventListener}) {
	const addUserFooter = document.createElement('div');
	const saveButton = document.createElement('button');
	const closeButton = document.createElement('button');

	addUserFooter.classList.add('modal-footer');

	saveButton.classList.add('btn', 'btn-outline-success');
	saveButton.textContent = 'Сохранить';
	saveButton.onclick = onSaveEventListener;

	closeButton.classList.add('btn', 'btn-outline-danger');
	closeButton.textContent = 'Отменить';
	closeButton.onclick = onCloseEventListener;

	addUserFooter.append(saveButton, closeButton);

	return addUserFooter;
}

function createInputField(col) {
	const label = document.createElement('label');
	const input = document.createElement('input');

	input.id = col.value;
	input.type = col.value === 'birthday' ? 'date' : 'text';
	input.required = true;

	label.textContent = col.title + ':';
	label.append(input);

	return label;
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

async function createTable(apiURL, config, parent) {

	if (!config) return;

	const table = document.createElement('table');

	parent.append(table);

	createTableHead(config, table);

	let users = await getData(apiURL);

	const sortType = typeof users[0][config.defaultSort.field];
	const sortValue = config.defaultSort.field;
	const sortState = sorts[config.defaultSort.state];
	const sortUsers = sortBy(sortType, sortValue, sortState, users);

	renderTableBody(config.columns, table, sortUsers, apiURL);

	const buttons = table.tHead.querySelectorAll('button');
	const input = parent.querySelector('input');

	buttons.forEach( btn => {
		btn.addEventListener('click',  async () => {
			const sortType = changeSort(parent, btn);
			users = await getData(apiURL);
			const sortUsers = sortBy(btn.dataset.type, btn.dataset.value, sortType, users);
			renderTableBody(config.columns, table, sortUsers, apiURL);
		});
	});

	input.addEventListener('input', async () => {
		users = await getData(apiURL);
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
		if (col.type) {
			cell.classList.add('align-right');
		}
		cell.innerText = col.title;
		if (col.sortable) {
			const type = !col.type ? 'string' : col.type;
			const sortClass = col.value === config.defaultSort.field ? sorts[config.defaultSort.state] : sorts['no'];
			// fixme: make it up with creating dom elements
			cell.innerHTML += `<button type="button" data-type="${type}" data-value="${col.value}"><i class="${sortClass}"></i></button>`;
		}
	});
}

function renderTableBody(cols, table, users, apiURL = '') {
	// FIXME: change creating tbody
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
					cell.innerHTML = `<button data-id="${user.id}">Удалить</button>`;
					const addUserButton = document.querySelector('#add-user');
					cell.innerHTML += `<button data-id="${user.id}" data-modal-target="${addUserButton.dataset.modalTarget}">Редактировать</button>`;
					const button = cell.querySelector('button');
					addDeleteUserListener(button, apiURL, cols, table, user.id);
					cell.classList.add('align-center');
				}
			}
		});
	});
}

function addDeleteUserListener(button, apiURL, cols, table, id) {
	button.addEventListener('click', async () => {
		const updatedUsers = await deleteUserById(apiURL, id).then(() => getData(apiURL));
		renderTableBody(cols, table, updatedUsers, apiURL);
	});
}

function changeSort(parent, button) {

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
			return (u1[value] - u2[value]) * coef;
		});
	} else if (type === 'string') {
		sortData.sort((u1, u2) => {
			return (u1[value].localeCompare(u2[value])) * coef;
		});
	}
	return sortData;
}

function findBy(users, { fields, filters }, query) {
	if (query === "") return users;

	return users.filter((user) => {
		return fields.filter((field) => {
			return filters.filter((searchFilter) => {
				return searchFilter(user[field]).includes(searchFilter(query));
			}).length
		}).length
	});
}

async function getData(apiURL) {
	return fetch(apiURL)
		.then((res) => res.json())
		.catch((error) => console.log(error));
}

async function deleteUserById(apiURL, userId) {
	return fetch(`${apiURL}/${userId}`, {method: 'DELETE'})
		.catch((error) => console.log(error));
}

async function updateUserById(apiURL, userId, updatedUser) {
	const data = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedUser)
	}
	return fetch(`${apiURL}/${userId}`, data)
		.catch((error) => console.log(error));
}

async function addUserById(apiURL, id, user) {
	const data = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	}
	return fetch(`${apiURL}/${id}`, data)
		.catch((error) => console.log(error));
}

async function saveUser(popupWindow, apiURL, table, users, inputs, columns) {
	const id = +users.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id) + 1;

	const newUser = {
		id,
		...inputs
	};
	console.log(newUser);
	for (const prop in newUser) {
		if (!newUser[prop])
			return;
	}
	const copyUsers = addUserById(apiURL, id, newUser).then(() => getData(apiURL));
	renderTableBody(columns, table, copyUsers, apiURL);
	closeModal(popupWindow);
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

export { DataTable, calculateAge, toKeyboardLayout };
