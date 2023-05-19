export const UsersService = {
    getUsersData() {
        return fetch('https://jsonplaceholder.typicode.com/users/')
            .then((response) => response.json());
    },
    addUser(userData) {
        return fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json());
    },
    editUser(id, userData) {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json());
    },
    deleteUser(id) {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        });
    }
}
