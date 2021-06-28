import decode from 'jwt-decode';

export default class AuthHelper {
    static isValid(token) {
        try {
            if (token !== null) {
                const decoded = decode(token);
                if (decoded && decoded.exp > (Date.now() / 1000)) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    static isAutenticed() {
        try {
            const state = JSON.parse(localStorage.getItem("state"));
            
            const token = state.auth.accessToken;

            if (token !== null) {
                const decoded = decode(token);

                if (decoded && decoded.exp > (Date.now() / 1000)) {
                    return true;
                }
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    static getUserName() {
        try {
            const state = JSON.parse(localStorage.getItem("state"));
            
            const token = state.auth.accessToken;

            if (token !== null) {
                const decoded = decode(token);
                if (decoded && decoded.exp > (Date.now() / 1000)) {
                    return decoded.Name;
                }
            }

            return '';
        } catch (err) {
            return '';
        }
    }

    static getUserId() {
        try {
            const state = JSON.parse(localStorage.getItem("state"));
            
            const token = state.auth.accessToken;

            if (token !== null) {
                const decoded = decode(token);
                if (decoded && decoded.exp > (Date.now() / 1000)) {
                    return decoded.UserId;
                }
            }

            return 0;
        } catch (err) {
            return 0;
        }
    }
}