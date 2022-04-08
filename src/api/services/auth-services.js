import axios from "axios";

const RESOURCE_URL = "/auth";

const login = (email, password) => {
  return axios
    .post(global.config.API_URL + RESOURCE_URL + "/login",null, { params : {
      email,
      password,
    }})
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("name", response.data.name)
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;