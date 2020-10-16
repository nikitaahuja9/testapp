import axios from 'axios';

const source = axios.CancelToken.source();

const instance = axios.create({
    baseURL: 'https://newsapi.org/v2/',
    timeout: 30000,
    headers: { 
        'Authorization': 
        `Bearer 418822b106364ba08ce5c90a179e372f` 
    },
    cancelToken: source.token
});

instance.interceptors.response.use(response => response, (error) => {
    if (axios.isCancel(error)) {
        console.log('Request canceled', error.mesage);
        return Promise.reject(null);
    }
    return Promise.reject(error);
});

const getNewsHeadLines = (page) => {
    const url = page ? 
    `top-headlines?pageSize=20&country=in&category=${page}` :  
    'top-headlines?country=in'
    return instance.get(url);
}
const $cancel = () => source.cancel();

export { getNewsHeadLines, $cancel }