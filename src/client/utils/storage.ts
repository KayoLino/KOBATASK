export const storage = {
     // Access Token
    setToken: (token: string) => {
        localStorage.setItem('access_token', token);
    },

    getToken: (): string | null => {
        return localStorage.getItem('access_token');
    },

    removeToken: () => {
        localStorage.removeItem('access_token');
    },

    // Refresh Token
    setRefreshToken: (token: string) => {
        localStorage.setItem('refresh_token', token);
    },

    getRefreshToken: (): string | null => {
        return localStorage.getItem('refresh_token');
    },

    removeRefreshToken: () => {
        localStorage.removeItem('refresh_token');
    },

    // User
    setUser: (user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser: <T = any>(): T | null => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    removeUser: () => {
        localStorage.removeItem('user');
    },

    // Clear all
    clearAuth: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },
};