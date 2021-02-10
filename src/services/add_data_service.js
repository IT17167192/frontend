import {API} from "../config";

export const checkOutstanding = (token, userId) => {
    return fetch(`${API}/checkOutstanding/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//update usage or extended data
export const updateDataByUserId = (token, data, userId) => {
    return fetch(`${API}/user/${userId}`, {
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
