import api from '@/config/http-client.gateway'
import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_URL;

const get_products = async (pagination) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(`${BASE_URL}/products/get_products`, {
            params: pagination,
            headers: headers
        });
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const save_product = async (data) => {
    try {
        const response = await api.doPost('/products/add_product', data, {
            headers:{
                'Content-Type': 'text/plain'
            }
        })
        return response;
    } catch (error) {
        return error.response;
    }
}

export default {
    get_products,
    save_product
}