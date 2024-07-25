import jwtDecode from "jwt-decode";

const getToken = () => {
    return localStorage.getItem("token")
}

const removeToken = () => {
    localStorage.removeItem("token")
}

export const getUserIdByToken = async () => {

    try {
        const { id } = jwtDecode(getToken())
        return id
    } catch (error) {
        removeToken()
    }
    
}

 export async function encodeBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => reject("");
    });
}

export const getUserInfoByToken = async () => {
    try {
        return jwtDecode(getToken())
    } catch (error) {
        removeToken()
    }
}

export const getRoleNameBytoken = async () => {
    try {
     const { role} = jwtDecode(getToken())
     return role
    } catch (error) {
         removeToken()
    }
 }

 export const closeSesion = async () => {
    removeToken();
 }

 export const existsToken = async () => {
    getToken();
 }