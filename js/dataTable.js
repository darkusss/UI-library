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
            value: 'surname'
        },
        {
            title: 'Возраст',
            value: 'age',
            type: 'number'
        },
    ]
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
];

function DataTable(config, data) {

    const table = document.querySelector(config.parent);

    createTable(table, config.columns, data);
}

function createTable(parent, columns, users) {

    const table = document.createElement('table');

    parent.appendChild(table);

    createThead(table, columns);
    createTbody(table, users);
}

function createThead(table, columns) {

    const thead = table.createTHead();
    const row = thead.insertRow(0);

    let cell;

    for (let i = 0; i < columns.length; i++) {
        cell = row.appendChild(document.createElement('th'));
        if (columns[i].type) {
            cell.setAttribute('class', 'align-right');
        }
        cell.innerHTML = columns[i].title;
    }
}

function createTbody(table, users) {

    const tbody = table.createTBody();

    let _index = 1, row, cell;

    for (let i = 0, j = 1; i < users.length; i++, j = 1) {
        row = tbody.insertRow(i);
        cell = row.insertCell(0);
        cell.innerHTML = _index++;

        for (let prop in users[i]) {
            if (prop === 'id') continue;
            cell = row.insertCell(j++);
            if (typeof users[i][prop] === 'number') {
                cell.setAttribute('class', 'align-right');
            }
            cell.innerHTML = users[i][prop];
        }
    }

}

DataTable(config1, users);