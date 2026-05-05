import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const signupUser = (data) => API.post("/signup", data);
export const verifyUser = () =>API.get("/verify");
export const loginUser = (data) => API.post("/login", data);
export const addUserTask=(data) => API.post("/tasks",data);
export const getTasks=(data) => API.get("/tasks",data);
export const deleteTasks = (id) =>API.delete(`/tasks/${id}`);
export const logoutUser = () => API.delete("/logout");
export const completeTasks=(id)=> API.put(`/tasks/complete/${id}`);
export const profile=()=>API.get("/user");
export const editTask = (id, data) =>API.put(`/tasks/edit/${id}`, data);
export const verificationLink=(email)=>API.post("/verify-email",{email});
export const verifyEmailToken = (token) =>API.get(`/verify-email/${token}`);