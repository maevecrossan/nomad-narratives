import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

axios.defaults.baseURL = `${API_URL}/api/`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();