import axios from 'axios'

const API = axios.create({
    baseURL: '/api',
    withCredentials: true,
})


//auto attching CSRF token from localStoragex
API.interceptors.request.use((config) => {
    const csrfToken = localStorage.getItem('csrf_refresh_token')
    if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken
    }
    return config;
}, (error) => Promise.reject(error));


export default API