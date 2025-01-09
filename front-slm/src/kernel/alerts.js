import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
};

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
};

export const showWarningToast = (message) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
};

export const showInfoToast = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
};

export const showPromiseToast = async (promise, messages) => {
    return await toast.promise(promise, {
        pending: messages.pending,
        success: messages.success,
        error: messages.error,
    }, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
    });
};