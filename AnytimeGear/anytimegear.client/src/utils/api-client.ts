import axios from 'axios'

export const apiPostClient = axios.create({
    baseURL: 'https://localhost:7148/api',
    timeout: 5000,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
})

export const apiGetClient = axios.create({
    baseURL: 'https://localhost:7148/api',
    timeout: 5000,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
})

export const apiClient = axios.create({
    baseURL: 'https://localhost:7148/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
})