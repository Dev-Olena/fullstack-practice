import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
})

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        // маємо додати до запиту заголовок Authorization з цим токеном
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}, 
(err) => { Promise.reject(err)});


// Auth API

export const signIn = async (data) => await httpClient.post('/users/sign-in', data);
export const signUp = async (data) => await httpClient.post('/users/sign-up', data);



// Chat API

export const getUserChats = async () => await httpClient.get('/chats')