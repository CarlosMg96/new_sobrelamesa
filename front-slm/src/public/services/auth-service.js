import api from "@/config/http-client-gateway";
import { showErrorToast } from '@/kernel/alerts';
import { setToken } from "@/kernel/utils";

export const Login = async (credentials) => {
    try {
        const { data } = await api.doPost('/auth/login', credentials);
        setToken(data.data.token);
        return data;
    } catch (error) {
        showErrorToast("Correo o contraseña incorrectas");
        return error;
    }
}