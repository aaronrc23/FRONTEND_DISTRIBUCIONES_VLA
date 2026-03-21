
import Cookies from "js-cookie";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useSessionStore } from "../../features/auth/store/useSessionStore";
import { showError, showInfo } from "../../shared/hooks/useSwalert";


let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {

    axiosInstance.interceptors.request.use((config) => {
     

        const token = Cookies.get("tokenp");
        console.log("TOKEN:", token);
        console.log("REQUEST HEADERS:", config.headers);
        if (config.url?.includes("/auth/refresh")) return config;
        if (token) {
            config.headers ??= {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,

        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & {
                _retry?: boolean;
            };

            if (!error.response) {
                showError("Error de red", "No se pudo conectar al servidor");
                return Promise.reject(error);
            }

            const { status } = error.response;

            if (status === 401 && !originalRequest._retry) {

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(() => {
                        return axiosInstance(originalRequest);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                const refreshToken = Cookies.get("refreshTokenp");

                if (!refreshToken) {
                    logout();
                    return Promise.reject(error);
                }

                try {
                    const response = await axiosInstance.post(
                        "/auth/refresh",
                        null,
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        }
                    );

                    const { accessToken, refreshToken: newRefresh } = response.data;

                    Cookies.set("tokenp", accessToken);
                    Cookies.set("refreshTokenp", newRefresh);

                    processQueue(null, accessToken);
                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    logout();
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            if (status === 403) {
                showError("Acceso denegado", (error.response.data as any)?.message ?? "");
            }

            return Promise.reject(error);
        }
    );
};

const logout = () => {
    Cookies.remove("tokenp");
    Cookies.remove("refreshTokenp");
    useSessionStore.getState().setSesionexp(true);

    showInfo("Sesión expirada", "Vuelve a iniciar sesión");

    setTimeout(() => {
        window.location.replace("/panel/login");
    }, 2000);
};
