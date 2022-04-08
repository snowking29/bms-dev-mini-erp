import axios from "axios";

const RESOURCE_URL = "customers/";

const headers = {
    "Access-Control-Allow-Origin": "*",
}

export const getCustomers = () => {
    let config = {
        method : "get",
        url : global.config.API_AWS_URL + RESOURCE_URL,
        headers: headers,
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
}

export const postCustomer = ( dataCustomer ) => {
    let config = {
        method : "post",
        url : global.config.API_AWS_URL + RESOURCE_URL,
        headers : headers,
        body : {
            "code": dataCustomer.code,
            "name": dataCustomer.name,
            "lastname": dataCustomer.lastname,
            "address": dataCustomer.address,
            "city": dataCustomer.city,
            "phone": dataCustomer.phone,
            "email": dataCustomer.email,
            "identifyID": dataCustomer.identifyID,
            "comments": dataCustomer.comments
        },
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
                console.log("Error: "+error);
            }
        }
    )
}

export const deleteCustomer = (key) => {
    let config = {
        method : "delete",
        url : global.config.API_URL + RESOURCE_URL + key,
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
}