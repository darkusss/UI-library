function addUserById(apiURL, user) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	}

	return fetch(apiURL, options)
		.catch((error) => console.log(error));
}

function updateUserById(apiURL, user) {
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	}
	return fetch(`${apiURL}`, options)
		.catch((error) => console.log(error));
}

function getUsers(apiURL) {
	return fetch(apiURL)
		.then((res) => res.json())
		.catch((error) => console.log(error));
}

function deleteUserById(apiURL, userId) {
	return fetch(`${apiURL}/${userId}`, {method: 'DELETE'})
		.catch((error) => console.log(error));
}

export { getUsers, addUserById, deleteUserById, updateUserById };
