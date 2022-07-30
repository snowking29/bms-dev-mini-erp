import axios from "axios";

const RESOURCE_URL = "categories/";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type":"application/json"
}

export const getCategories = () => {
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

export const postCategories = ( dataCategory ) => {
    let config = {
        method : "post",
        url : global.config.API_AWS_URL + RESOURCE_URL,
        headers: headers,
        data : dataCategory,
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


export const putCategories = ( key, dataCategory ) => {
    let config = {
        method : "put",
        url : global.config.API_AWS_URL + RESOURCE_URL,
        headers: headers,
        params: {
            "key": key
        },
        data : dataCategory,
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


export const deleteCategories = (key) => {
    let config = {
        method : "delete",
        url : global.config.API_AWS_URL + RESOURCE_URL,
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