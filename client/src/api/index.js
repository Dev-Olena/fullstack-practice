import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const signIn = async (data) => await httpClient.post('/users/sign-in', data);
export const signUp = async (data) => await httpClient.post('/users/sign-up', data);