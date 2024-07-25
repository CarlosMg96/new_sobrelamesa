import api from '@/config/http-client.gateway'

const login = async (credentials) => {
    try {
        let response = await api.doPost('/auth/login', credentials);
        return response
    }catch(error){
        return error.response
    }
}

export default {
    login
}