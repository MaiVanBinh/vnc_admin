export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getQuery = (data) => {
    let query = [];
    for(let key in data) {
        if(typeof data[key] === 'string'){
            const queryString = key + '=' + encodeURIComponent(data[key]);
            query.push(queryString);
        } else {
            const queryString = key + '=' + encodeURIComponent(JSON.stringify(data[key]));
            query.push(queryString);
        }
    }
    return query.join('&');
}