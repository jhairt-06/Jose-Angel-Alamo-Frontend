import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

// 1. INTERCEPTOR DE SOLICITUD
// Inyecta el token en cada petición automáticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. INTERCEPTOR DE RESPUESTA
// Si el token vence, intenta renovarlo sin molestar al usuario
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh');
                
                if (refreshToken) {
                    const response = await axios.post(`${baseURL}auth/jwt/refresh/`, {
                        refresh: refreshToken
                    });

                    localStorage.setItem('access', response.data.access);

                    originalRequest.headers.Authorization = `JWT ${response.data.access}`;
                    return api(originalRequest);
                }
            } catch (err) {
                console.log("Sesión caducada, cerrando...");
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('usuario');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;