const sorts = {
	no: 'fas fa-sort',
	ascending: 'fas fa-sort-up',
	descending: 'fas fa-sort-down'
};

const searchId = 'table-search';


export function DataTable(config, data) {
	const parent = document.querySelector(config.parent);
	const search = config.search;


	if (search !== undefined && search.fields)
		createSearchField(parent);

	createTable(config, parent, data);
}

function createSearchField(parent) {
	const div = document.createElement('div');
	const input = document.createElement('input');

	input.setAttribute('type', 'text');

	div.setAttribute('id', searchId);
	div.appendChild(input);

	parent.appendChild(div);
}

function createTable(config, parent, users) {

	if (!config) return;

	const table = document.createElement('table');

	parent.appendChild(table);

	createTableHead(config, table);
	renderTable(config.columns, table, users);

	const buttons = document.querySelectorAll('#user-table button');
	const input = document.querySelector('#user-table input')

	addButtonListener(config, users, table, buttons);
	addInputListener(config, table, users, input);
}

function createTableHead(config, table) {
	const thead = document.createElement('thead');

	table.appendChild(thead);
	const row = document.createElement('tr');

	thead.appendChild(row);

	config.columns.forEach(col => {
		const cell = row.appendChild(document.createElement('th'));
		if (col.type) {
			cell.classList.add('align-right');
		}
		cell.innerHTML = col.title;
		if (col.sortable) {
			const type = !col.type ? 'string' : col.type;
			const sortClass = sorts[config.defaultSort.type];
			cell.innerHTML += `<button type="button" data-type="${type}" data-value="${col.value}"><i class="${sortClass}"></i></button>`;
		}
	});
}

export function renderTable(cols, table, users) {
	const getTbody = table.querySelector('tbody');

	let tbody;

	if (getTbody) {
		getTbody.remove();
	}

	tbody = table.appendChild(document.createElement('tbody'));

	let row, cell;

	users.forEach((user, _index) => {
		row = tbody.appendChild(document.createElement('tr'));
		cell = row.appendChild(document.createElement('td'));
		cell.innerHTML = _index + 1;

		cols.forEach((col) => {
			if (user[col.value]) {
				cell = row.appendChild(document.createElement('td'));
				cell.innerHTML = user[col.value];

				if (user.type === 'number') {
					cell.classList.add('align-right');
				}
			}
		});
	});
}

function sortBy(button, data) {
	const {type, value} = button.dataset;
	const sortType = button.querySelector('i').getAttribute('class');
	console.log(type);
	const sortData = [...data];

	if (type === 'number') {
		switch (value) {
			case 'age':
				if (sortType.includes('up')) {
					sortData.sort((u1, u2) => u1.age - u2.age);
				} else if (sortType.includes('down')) {
					sortData.sort((u1, u2) => u2.age - u1.age);
				}
				break;
		}
	} else if (type === 'string') {
		switch (value) {
			case 'surname':
				if (sortType.includes('up')) {
					sortData.sort((u1, u2) => u1.surname.localeCompare(u2.surname));
				} else if (sortType.includes('down')) {
					sortData.sort((u1, u2) => u2.surname.localeCompare(u1.surname));
				}
				break;
		}
	}
	return sortData;
}

function setUnusedButtonDefault(buttons, button, icons, icon, defaultSort) {
	buttons.forEach(btn => {
		if (btn !== button) {
			icons.forEach((icn) => {
				if (icn !== icon) {
					icn.setAttribute('class', sorts[defaultSort.type]);
				}
			})
		}
	});
}

function changeSort(buttons, button, defaultSort) {

	const icons = document.querySelectorAll('th i');
	const currentIcon = button.querySelector('i');

	setUnusedButtonDefault(buttons, button, icons, currentIcon, defaultSort);

	let currentSort = currentIcon.getAttribute('class');

	switch (currentSort) {
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

}

function findBy(users, search, query) {
	const {fields, filters} = search;
	if (query != "")
		return users.filter((user) => {
			return fields.filter((field) => {
				return filters.filter((searchFilter) => {
					return searchFilter(user[field]).includes(searchFilter(query));
				}).length
			}).length
		});
	return users;
}

function addButtonListener(config1, users, table, buttons) {
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			changeSort(buttons, button, config1.defaultSort);
			const sortUsers = sortBy(button, users);
			renderTable(config1.columns, table, sortUsers);
		})
	})
}


function addInputListener(config, table, users, input) {
	input.addEventListener('input', () => {
		const filterUser = findBy(users, config.search, input.value);
		renderTable(config.columns, table, filterUser)
	});
}





