import axios from "axios";
const BASE_URL = "http://localhost:8080/auth";

export const signupUser = (data) => {
    return axios.post(`${BASE_URL}/signup`, data, {
        withCredentials: true,
    });
}

export const loginUser = (data) => {
    return axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
    });
}

export const logoutUser = () => {
    return axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
    })
}