import axios from "axios";

const RESOURCE_URL = "/auth";

const login = (email, password) => {
  return axios
    .post(global.config.API_URL + RESOURCE_URL + "/login",null, { params : {
      email,
      password,
    }})
    .then((response) => {
      if (response.data.success === "true") {
        if (response.data.data.token) {
          localStorage.setItem("SESSION_ID", JSON.stringify(response.data.data.token));
          localStorage.setItem("SESSION_USER", JSON.stringify({
            "name":response.data.data.name,
            "email":response.data.data.email,
            "role":response.data.data.role
          }));
        }
      }
      return response.data;
    })
};

const logout = () => {
  localStorage.removeItem("SESSION_ID");
  localStorage.removeItem("SESSION_USER");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("SESSION_USER"))
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;