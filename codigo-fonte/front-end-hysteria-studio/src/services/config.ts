import axios from 'axios';

export const apiFetch = axios.create({
    baseURL: 'http://localhost:3333',
});