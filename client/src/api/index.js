import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

const profile = JSON.parse(localStorage.getItem("profile"));

const accessHeader = {
  headers: {
    Authorization: `token ${profile ? profile.accessToken : null}`,
  },
};
export const loginIn = (formData) => API.post("/api/users/v1/login", formData);

export const register = (formData) =>
  API.post("/api/users/v1/register", formData);

export const getEmailList = () =>
  API.get("/api/users/v1/emailList", accessHeader);

export const createGroup = (formData) =>
  API.post("/api/group/v1/add", formData, accessHeader);

export const editGroup = (formData) =>
  API.post("/api/group/v1/edit", formData, accessHeader);
export const getGroupDetails = (formData) =>
  API.post("/api/group/v1/view", formData, accessHeader);
