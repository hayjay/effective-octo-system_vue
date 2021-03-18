import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('x-access-token')}`;
export default axios.create({
  // baseURL: "http://localhost:8080/8000",
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  }
});