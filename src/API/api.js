import axios from 'axios';

const API_URL = 'https://api-restful-backend.onrender.com/api/usuarios';

export const getUsuarios = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createUsuario = async (usuario) => {
    const response = await axios.post(API_URL, usuario);
    return response.data;
};
