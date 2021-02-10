import {API} from "../../config";

export const getUsersWithNullPackage = (token) => {
    return fetch(`${API}/user/without/package`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//update package of the user by userId
export const updateUserPackage = (token, data, userId) => {
    return fetch(`${API}/user/add/package/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
