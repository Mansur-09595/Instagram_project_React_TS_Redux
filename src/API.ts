import axios from 'axios'
import Cookies from 'js-cookie'

export const baseURL = "https://unicode-unigram-xmfu.onrender.com";

export const baseService = axios.create({
    baseURL,
});

// baseService.patch("/posts")

export const logout = (): void => {
    Cookies.remove("token");
};

export const fillToken = (token: string) => {
    baseService.defaults.headers.common.Authorization = `Bearer ${token}`;
    Cookies.set("token", token);
};

export const attachAuthToken = (token: string) => {
    baseService.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const token = Cookies.get("token");

baseService.interceptors.response.use((res) => res, (error) => {
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
    }
)