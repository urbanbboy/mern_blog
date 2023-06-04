import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mern-app-7eoi.onrender.com/api',
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance