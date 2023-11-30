import axios from "axios"

export async function get(url, token, unauthorizedCallback ,...others){

    try {
        const response = await axios.get(url, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            unauthorizedCallback()
        }
        return error.data;
    }
}

export async function post(url, token, data, unauthorizedCallback){

    try {
        const response = await axios.post(url,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        
        if(error.response.status === 401)
        {
            unauthorizedCallback();
        }

        return error.response.data;
    }

}


export async function put(url, token, data, unauthorizedCallback){

    try {
        const response = await axios.put(url,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        
        if(error.response.status === 401)
        {
            unauthorizedCallback();
        }

        return error.response.data;
    }
}


// module.exports = { get }