import axios from "axios";

const RESOURCE_URL = "inventory/";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type":"application/json"
}

export const getInventory = () => {
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

export const getInventoryBy = (params) => {
    let config = {
        method : "get",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers: headers,
        params: params,
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

export const postInventory = ( dataInventory ) => {
    let config = {
        method : "post",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers: headers,
        data : dataInventory,
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

export const putInventory = ( key, dataSale, upsert ) => {
    let config = {
        method : "put",
        url : global.config.API_AWS_URL + global.config.RESOURCE_ENTITY_AWS + RESOURCE_URL,
        headers: headers,
        params: {
            "key": key,
            "upsert": upsert
        },
        data : dataSale,
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

export const deleteInventory = (key) => {
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