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
            // if(error.response.data.error === 'Token has expired')
            // {
            //   alert('Token has expired');
            // }else{
            //   alert('Token is invalid')
            // }
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


function put(){

}


// module.exports = { get }