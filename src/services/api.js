import axios from "axios";

const API = axios.create({
  baseURL: "https://devtask-tracker-backend.onrender.com/api/tasks",
});

export const fetchTasks = () => API.get("/");
export const createTask = (taskData) => API.post("/", taskData);
export const updateTask = (id, updatedData) => API.patch(`/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/${id}`);
