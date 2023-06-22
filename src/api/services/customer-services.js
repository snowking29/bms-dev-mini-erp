import axios from "axios";

const RESOURCE_URL = "customers/";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type":"application/json"
}

export const getCustomers = () => {
    let config = {
        method : "get",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
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
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers : headers,
        data : dataCustomer,
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

export const putCustomers = ( key, dataCustomer ) => {
    console.log(dataCustomer)
    let config = {
        method : "put",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers: headers,
        params: {
            "key": key
        },
        data : dataCustomer,
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

export const deleteCustomer = (key) => {
    let config = {
        method : "delete",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        params: {
            "key": key
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
            if (error.response.status !== undefined && error.response.status === 403){
                console.log("Error : "+error);
            }
        }
    )
}