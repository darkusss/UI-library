function addUserById(apiURL, id, user) {
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

function updateUserById(apiURL, userId, updatedUser) {
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
