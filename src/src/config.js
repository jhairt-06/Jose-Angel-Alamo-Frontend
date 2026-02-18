const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";


export const API_URL = isLocal 
    ? "http://127.0.0.1:8000" 
    : "https://JoseAngelAlamo.pythonanywhere.com"; 

export const getMediaUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path; 
    return `${API_URL}${path}`;
};