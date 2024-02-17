import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });
// const API = axios.create({ baseURL: ''})

const profile = JSON.parse(localStorage.getItem("profile"));

const accessHeader = {
  headers: {
    Authorization: `token ${profile ? profile.accessToken : null}`,
  },
};

export const loginIn = (formData) => API.post("/api/users/v1/login", formData);

export const register = (formData) =>
  API.post("/api/users/v1/register", formData);

export const deleteUser = (formData) =>
  API.delete("/api/users/v1/delete", {
    headers: accessHeader.headers,
    data: formData,
  });

export const updatePassword = (formData) =>
  API.post("/api/users/v1/updatePassword", formData, accessHeader);

export const getUser = (formData) =>
  API.post("/api/users/v1/view", formData, accessHeader);
