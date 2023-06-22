import axios from "axios";

const RESOURCE_URL = "roles/";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type":"application/json"
}

export const getRoles = () => {
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

export const postRoles = ( dataRol ) => {
    let config = {
        method : "post",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers: headers,
        data : dataRol,
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

export const putRoles = ( key, dataRol, upsert ) => {
    let config = {
        method : "put",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers: headers,
        params: {
            "key": key,
            "upsert": upsert
        },
        data : dataRol,
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

export const deleteRol = (key) => {
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