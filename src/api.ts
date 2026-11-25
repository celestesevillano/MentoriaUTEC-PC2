import axios from "axios";

const api = axios.create({
    baseURL: "https://mentoriautec-api.aaron-navarro.workers.dev/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const isAuth = config.url?.includes("/api/auth/");
    if (token && !isAuth) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        const url = error.config?.url ?? "";
        if (error.response?.status === 401 && !url.includes("/api/auth/")) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;