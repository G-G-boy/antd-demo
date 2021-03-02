import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';

interface ApiResponse<Data> {
    code: number;
    data: Data;
    message: string;
}

axios.defaults.baseURL = 'http://aaa/';
axios.defaults.withCredentials = false;

const http = axios.create({});

http.interceptors.request.use(
    (config) => {
        console.log(`TokenInterceptor.intercept...[${config.baseURL}${config.url}]`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

function get<T = any, P = any, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    params?: P,
    config: AxiosRequestConfig = {},
): Promise<R> {
    config.params = params || {};
    return http.get(url, config);
}

function post<T = any, P = any, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    },
): Promise<R> {
    return http.post(url, data || {}, config);
}

export {get, post};
