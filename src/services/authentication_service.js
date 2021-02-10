import {API} from "../config";

export const signUp = (data) => {
    return fetch(`${API}/user/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const login = (data) => {
    return fetch(`${API}/user/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const logout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('credentials');
        next();
    }
};
