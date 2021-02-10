import {API} from "../../config";

export const getAllPackages = (token) => {
    return fetch(`${API}/package/all`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//delete package by packageId
export const deletePackageById = (token, packageId) => {
    return fetch(`${API}/package/${packageId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//add package
export const addPackage = (token, data) => {
    return fetch(`${API}/package/create`, {
        method: 'POST',
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

//update package
export const updatePackage = (token, data, packageId) => {
    return fetch(`${API}/package/${packageId}`, {
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
