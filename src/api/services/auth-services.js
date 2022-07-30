import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-type":"application/json"
}
const login = (email, password) => {
  let config = {
    method : "post",
    url : global.config.API_URL,
    headers: headers,
    params : {
      email,
      password,
    },
    validateStatus: function (status) {
        return status >= 200 && status < 400
    }
  }
  console.log(config);
  return axios(config).then((response) => {
      console.log(response)
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