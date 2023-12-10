import axios from "axios";

export const ProductService = {
    async getData() {
        
        try {
            const products = await axios.get('http://localhost:3000/api/product/');
            return products.data
        } catch (error) {
            console.error(error);
        }
    },


    getProducts() {
        return Promise.resolve(this.getData());
    },


    
};
