//add token and user values to local storage
export const storeCredentials = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('credentials', JSON.stringify(data));
        next();
    }
};

//check local storage and give user credentials
export const isLoggedIn = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('credentials')) {
        return JSON.parse(localStorage.getItem('credentials'));
    } else {
        return false;
    }
};
