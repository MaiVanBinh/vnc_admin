const APP_ROOT = 'http://localhost:8080/';

const apiName = {
    creatures: 'creatures',
    groups: 'groups',
    filterData: 'filterData',
    posts: 'posts',
    species: 'species',
    category: 'category'
}

/**
 * 
 * @param {string} method 
 * @param {string} apiNameOption 
 * @param {*} params 
 * @param {object} query 
 */
const getApi = (method, apiNameOption, params, query) => {
    switch(method) {
        case 'GET': {
            let api = APP_ROOT + apiName[apiNameOption];
            if(params) {
                api += '/' + params;
            }
            if(query) {
                api += '?' + query;
            }
            return api;
        }; 
        default: return '';
    }
}

const getOptionsApi = (method, data) => {
    switch (method) {
        case 'GET':
            return {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        case 'POST':
            return {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        case 'PUT':
            return {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        case 'DELETE':
            return {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        default:
    }
}

export {
    getApi,
    getOptionsApi
}