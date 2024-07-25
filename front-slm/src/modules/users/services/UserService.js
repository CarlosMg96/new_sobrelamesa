import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_URL;

const get_user = async (pagination) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(`${BASE_URL}/auth/get_users`, {
            params: pagination,
            headers: headers
        });
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        return error.response.data; // Retornar el error del servidor si ocurre
    }
};


const save_user = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Cambiado a 'application/json' en lugar de 'text/plain'
        };
        const response = await axios.post(`${BASE_URL}/auth/register`, data, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error saving user:', error);
        return error.response.data; // Retornar el error del servidor si ocurre
    }
};

export default {
    get_user,
    save_user
};
