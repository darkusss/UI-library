
export function DataTable(config1 = undefined, data = undefined, sorts) {
	createTable(config1, data, sorts);
}

function createTable(config, users, sorts) {
	// TODO: Если нет данных, то сделать модалку с ошибкой
	if (config == undefined || users == undefined || !users.length) return;

	const table = document.createElement('table');
	const parent = document.querySelector(config.parent);

	parent.appendChild(table);

	createTableHeadWith(table, config.columns);
	createTableBodyWith(parent, users);

	addSortButtonClass(config.columns, table, sorts[config.defaultSort.type]);
}

function createTableHeadWith(table, cols) {

	const thead = table.createTHead();
	const row = thead.insertRow(0);

	let cell;

	// todo: вынести в отдельную функцию
	cols.forEach(col => {
		cell = row.appendChild(document.createElement('th'));
		cell.setAttribute('id', col.value);
		if (col.type) {
			cell.setAttribute('class', 'align-right');
		}
		cell.innerHTML = col.title;
	});
}

function createTableBodyWith(parent, cols) {

	const table = parent.querySelector('table');
	const getTbody = table.querySelector('tbody');
	let tbody;

	if (!getTbody) {
		tbody = table.createTBody();
	} else {
		getTbody.remove();
		tbody = table.appendChild(document.createElement('tbody'));
	}

	let _index = 1, row, cell;

	for (let i = 0, j = 1; i < cols.length; i++, j = 1) {
		row = tbody.insertRow(i);
		cell = row.insertCell(0);
		cell.innerHTML = _index++;

		// todo: добавление аттрибутов вынести в отдельную функцию
		for (let prop in cols[i]) {
			if (prop === 'id') continue;
			cell = row.insertCell(j++);
			if (typeof cols[i][prop] === 'number') {
				cell.setAttribute('class', 'align-right');
			}
			cell.innerHTML = cols[i][prop];
		}
	}
}

function addSortButtonClass(cols, table, className = 'fas fa-sort') {
	const cells = table.tHead.rows.item(0).cells;
	let i = 0;

	for (const cell of cells) {
		if (cols[i].sortable) {
			cell.innerHTML += `<button type="button"><i class="${className}"></i></button>`;
		}
		i++;
	}
}

export function sortBy(defaultSort, data, sorts) {
	const {field, type} = defaultSort;
	const sortType = sorts[type];
	const sortData = [...data];

	if (field === 'age' && sortType.includes('up')) {
		sortData.sort((u1, u2) => u1.id - u2.id);
	} else if (field === 'age' && sortType.includes('down')){
		sortData.sort((u1, u2) => u2.id - u1.id);
	} else if (field === 'surname' && sortType.includes('down')) {
		sortData.sort((u1, u2) => u1.surname.localeCompare(u2.surname));
	} else if (field === 'surname' && sortType.includes('down')) {
		sortData.sort((u1, u2) => u2.surname.localeCompare(u1.surname));
	}

	return sortData;
}

export function changeSort(buttons, button, defaultSort, sorts) {
	const parentCol = button.closest('th');

	if (defaultSort.field !== parentCol.getAttribute('id')) {
		defaultSort.type = 'no';
		buttons.forEach(btn => {
			if (btn !== button)
				btn.setAttribute('class', sorts[defaultSort.type])
		})
	}

	defaultSort.field = parentCol.getAttribute('id');

	switch (defaultSort.type) {
		case 'no':
			defaultSort.type = 'ascending';
			break;
		case 'ascending':
			defaultSort.type = 'descending';
			break;
		case 'descending':
			defaultSort.type = 'no';
			break;
	}

	button.setAttribute('class', sorts[defaultSort.type]);
}

export function renderTable(table, sortData) {
	createTableBodyWith(table, sortData);
}






