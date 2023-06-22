import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-type":"application/json"
}
const login = (email, password) => {
  let config = {
    method : "post",
    url : global.config.API_AWS_URL + 'login',
    headers: headers,
    params : {
      email,
      password,
    },
    validateStatus: function (status) {
        return status >= 200 && status < 400
    }
  }
  return axios(config).then((response) => {
      if (response.data.success === "true") {
        if (response.data.data.token) {
          localStorage.setItem("SESSION_ID", JSON.stringify(response.data.data.token));
          localStorage.setItem("SESSION_USER", JSON.stringify({
            "fullName":response.data.data.fullName,
            "email":response.data.data.email,
            "role":response.data.data.role
          }));
        }
      }
      return response.data;
    })
};

const register = (data) => {
  let config = {
    method : "post",
    url : global.config.API_AWS_URL + 'register',
    headers: headers,
    params : data,
    validateStatus: function (status) {
        return status >= 200 && status < 400
    }
  }
  return axios(config).then(
    function(response){
        return response
    }
  ).catch(
      function(error){
          if (!error.response.status !== undefined && !error.response.status === 403){
              console.log("Error : "+error);
          }
      }
  )
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
  register,
  logout,
  getCurrentUser,
};

export default authService;