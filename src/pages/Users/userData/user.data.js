import { get } from '../../../utils/request'
import axios from 'axios';
export const UsersServices = {
    async getUsersData(unauthorizedCallback) {
        // const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            // const data = await get("http://localhost:3000/api/product/upload-images", token,unauthorizedCallback );
            const response = await axios.get('http://localhost:3000/api/users');
            
            return await response.data
        } catch (error) {
            console.log(error);
            unauthorizedCallback()
        }
    },


    getAllUsers(unauthorizedCallback) {
        return this.getUsersData(unauthorizedCallback);
    },

    
};

