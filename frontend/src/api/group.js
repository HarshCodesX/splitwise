import axios from "axios";
const BASE_URL = "http://localhost:8080/group";

export const fetchMyGroups = () => {
    return axios.get(`${BASE_URL}/all`, {
        withCredentials: true,
    })
}

export const createGroup = (data) => {
    return axios.post(`${BASE_URL}/create`, data, {withCredentials: true});
} 

export const deleteGroup = (groupId) => {
    return axios.delete(`${BASE_URL}/${groupId}/delete`, {withCredentials: true,})
}

export const addExpense = (groupId, data) => {
  return axios.post(`http://localhost:8080/group/${groupId}/expenses`, data, {
    withCredentials: true,
  });
};

export const getGroupDetails = (groupId) => {
  return axios.get(`${BASE_URL}/${groupId}`, { withCredentials: true });
};

export const deleteExpense = (groupId, expenseId) => {
  return axios.delete(`${BASE_URL}/${groupId}/${expenseId}/delete`, {
    withCredentials: true,
  });
};

export const settleGroup = (groupId) => {
    return axios.get(`${BASE_URL}/${groupId}/settle`, {withCredentials: true});
}