import {API} from "../config";

export const getUserInfoByUserId = (token, userId) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
