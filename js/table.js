const sorts = {
	no: 'fas fa-sort',
	ascending: 'fas fa-sort-up',
	descending: 'fas fa-sort-down'
};

export async function DataTable(config, data) {
	const parent = document.querySelector(config.parent);
	const search = config.search;
	const modalId = 'modal-for-table';

	let users;
	let apiURL;

	if (!data && config.apiUrl) {
		apiURL = config.apiUrl;
		users = await getData(apiURL);
	} else {
		users = [...data];
	}

	if (search) createSearchField(parent);

	// addUserButton('Добавить', parent, 'modal-for-table', 'btn-outline-success');
	const button = parent.querySelector('button');
	button.dataset.modalTarget = '#' + modalId;
	addModalWindow(modalId, parent, 'Введите данные', config.columns);

	// const tableSection = document.querySelector('.table-section');
	// const buttonAdd = tableSection.querySelector('[data-close-button]');
	//
	// console.log(buttonAdd);
	//
	// const name = document.querySelector('#name');
	// const surname = document.querySelector('#surname');
	// const picture = document.querySelector('#picture');
	// const dataOfBirthday = document.querySelector('#birthday');
	//
	// addListener(buttonAdd, 'click', () => {
	//
	// 	console.log(name.value, surname.value, picture.value, dataOfBirthday.value);
	// })

	createTable(apiURL, config, parent, users);
}

function addModalWindow(id, parent, modalHeaderText, cols) {
	const modal = document.createElement('div');

	parent.appendChild(modal);

	modal.classList.add('modal');
	modal.setAttribute('id', id);

	const modalHeader = addModal('modal-header', modal);

	modalHeader.innerHTML = `<h2>${modalHeaderText}</h2>`;

	const modalBody = addModal('modal-body', modal);

	addInputFields(modalBody, cols);

	const modalFooter = addModal('modal-footer', modal);

	modalFooter.innerHTML = '<button type="button" class="btn btn-outline-success" data-close-button >Сохранить<button/>' +
		'<button type="button" class="btn btn-outline-danger" data-close-button >Отменить<button/>';
}

function addModal(name, parent) {
	const modalElement = appendElement(parent, 'div');
	modalElement.classList.add(name);

	return modalElement;
}

function addInputFields(parent, cols) {
	const filterCols = cols.filter((col) => col.editable);
	filterCols.forEach((col) => {
		addInputField(parent, col);
	})
}

function addInputField(parent, col) {
	const label = appendElement(parent, 'label');
	label.innerText = col.title + ':';
	label.setAttribute('for', col.value);
	const input = appendElement(label, 'input');
	input.setAttribute('id', col.value);
	if (col.value === 'avatar') {
		input.setAttribute('type', 'date');
	} else {
		input.setAttribute('type', 'text');
	}
}

function addUserButton(name, parent, id, btnStyleClass) {
	const button = document.createElement('button');

	button.innerText = name;
	button.setAttribute('type', 'button');
	button.classList.add('btn');
	button.classList.add(btnStyleClass);
	button.dataset.modalTarget = '#' + id;

	parent.append(button);

	return button;
}

function createSearchField(parent) {
	const div = document.createElement('div');
	const input = document.createElement('input');
	const searchId = 'table-search';

	input.setAttribute('type', 'text');

	div.setAttribute('id', searchId);
	div.classList.add(searchId);
	div.appendChild(input);

	parent.appendChild(div);
}

function createTable(apiURL, config, parent, users) {

	if (!config) return;

	const table = document.createElement('table');

	parent.appendChild(table);

	createTableHead(config, table);

	if (!users.length) return;

	const type = typeof users[0][config.defaultSort.field];
	const value = config.defaultSort.field;
	const state = sorts[config.defaultSort.state];
	const sortUsers = sortBy(type, value, state, users);

	renderTable(apiURL, config.columns, table, sortUsers);

	const buttons = table.tHead.querySelectorAll('button');
	const input = parent.querySelector('input');

	buttons.forEach(btn => {
		addListener(btn, 'click', () => {
			const sortType = changeSort(parent, btn);
			const sortUsers = sortBy(btn.dataset.type, btn.dataset.value, sortType, users);
			renderTable(apiURL, config.columns, table, sortUsers);
		});
	});

	addListener(input, 'input', () => {
		const filterUser = findBy(users, config.search, input.value);
		renderTable(apiURL, config.columns, table, filterUser);
	});
}

function createTableHead(config, table) {
	const thead = document.createElement('thead');
	const row = document.createElement('tr');

	table.appendChild(thead);
	thead.appendChild(row);

	config.columns.forEach(col => {
		const cell = appendElement(row, 'th');
		if (col.type) {
			cell.classList.add('align-right');
		}
		cell.innerText = col.title;
		if (col.sortable) {
			const type = !col.type ? 'string' : col.type;
			const sortClass = col.value === config.defaultSort.field ? sorts[config.defaultSort.state] : sorts['no'];
			cell.innerHTML += `<button type="button" data-type="${type}" data-value="${col.value}"><i class="${sortClass}"></i></button>`;
		}
	});
}

function appendElement(parent, name) {
	return parent.appendChild(document.createElement(name));
}

export function renderTable(apiURL, cols, table, users) {
	let tbody = table.querySelector('tbody');

	if (tbody) {
		tbody.innerHTML = '';
	} else {
		tbody = appendElement(table, 'tbody');
	}

	let row, cell;

	users.forEach((user, _index) => {
		row = appendElement(tbody, 'tr');
		cell = appendElement(row, 'td');
		cell.innerText = _index + 1;

		cols.forEach((col) => {
			if (col.visible) {
				cell = appendElement(row, 'td');
				cell.innerText = user[col.value];
				if (col.type === 'number') {
					cell.classList.add('align-right');
				}
				if (typeof col.value === 'function') {
					cell.innerText = col.value(user);
				} else if (col.value === 'avatar') {
					cell.innerHTML = `<img src="${user[col.value]}" alt="image"/>`;
					cell.classList.add('align-center');
				}
				if (col.value === 'acts') {
					cell.innerHTML = addButton('Удалить', user.id);
					const button = cell.querySelector('button');
					// todo: вынести
					button.addEventListener('click', async () => {
						users = await deleteUserById(apiURL, user.id)
							.then(() => getData(apiURL));
						renderTable(apiURL, cols, table, users);
					});
					cell.classList.add('align-center');
				}
			}
		});
	});
}

async function getData(apiURL) {
	return fetch(apiURL)
		.then((res) => res.json())
		.catch((error) => console.log(error));
}

async function deleteUserById(apiURL, userId) {
	return fetch(`${apiURL}/${userId}`, {method: 'DELETE'});
}

function addButton(name, userId) {
	return `<button type="button" data-id="${userId}">${name}</button>`;
}

function sortBy(type, value, sortType, data) {
	const sortData = [...data];
	const coef = sortType.includes('up') ? 1 : sortType.includes('down') ? -1 : 0;

	if (type === 'number') {
		sortData.sort((u1, u2) => {
			return (u1[value] - u2[value]) * coef;
		})
	} else if (type === 'string') {
		sortData.sort((u1, u2) => {
			return (u1[value].localeCompare(u2[value])) * coef;
		})
	}
	return sortData;
}

function setUnusedIconsDefault(icons) {
	icons.forEach((icon) => {
		icon.setAttribute('class', sorts['no']);
	})
}

function changeSort(parent, button) {

	const icons = parent.querySelectorAll('button i');
	const currentIcon = button.querySelector('i');
	const currentSortIcon = currentIcon.getAttribute('class');

	setUnusedIconsDefault(icons);

	switch (currentSortIcon) {
		case 'fas fa-sort':
			currentIcon.setAttribute('class', sorts['ascending']);
			break;
		case 'fas fa-sort-up':
			currentIcon.setAttribute('class', sorts['descending']);
			break;
		case 'fas fa-sort-down':
			currentIcon.setAttribute('class', sorts['no']);
			break;
	}

	return currentIcon.getAttribute('class');
}

function findBy(users, search, query) {
	if (query === "") return users;

	const {fields, filters} = search;

	return users.filter((user) => {
		return fields.filter((field) => {
			return filters.filter((searchFilter) => {
				return searchFilter(user[field]).includes(searchFilter(query));
			}).length
		}).length
	});
}

function addListener(element, event, callback) {
	element.addEventListener(event, callback);
}
