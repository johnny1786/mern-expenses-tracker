import axios from "axios";
import { BASE_URL } from "../../utils/url";


//!Login
export const loginAPI = async ({ email, password}) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
    });
    return response.data;
}


//!Register
export const registerAPI = async ({ username, email, password, confirmPassword }) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        username,
        email,
        password,
    });
    return response.data;
}