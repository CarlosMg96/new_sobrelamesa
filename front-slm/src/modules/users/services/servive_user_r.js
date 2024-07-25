import api from '@/config/http-client.gateway'

const get_user = async (pagination) => {
    try {
        let response = await api.doGet('/auth/get_users', {params: pagination});
        console.log(response);
        return response
    }catch(error){
        return error.response
    }
}

const save_user = async (data) => {
    try {
        const response = await api.doPost('/auth/register', data, {
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
    get_user,
    save_user
}