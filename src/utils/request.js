import axios from "axios";

export async function get(url, token, unauthorizedCallback, ...others) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...others, // Spread any additional options
    });

    return response.data;
  } catch (error) {
    console.error("Error in get request:", error);

    if (error.response.status === 401) {
      // if(error.response.data.error === 'Token has expired')
      // {
      //   alert('Token has expired');
      // }else{
      //   alert('Token is invalid')
      // }
      unauthorizedCallback();
    }
  }
}


export async function post(url, token, data, unauthorizedCallback) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure to set the content type for FormData
      },
    });

    return response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      unauthorizedCallback();
    }

    return error?.response?.data;
  }
}

export async function del(url, token, unauthorizedCallback) {
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      unauthorizedCallback();
    }

    return error?.response?.data;
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
