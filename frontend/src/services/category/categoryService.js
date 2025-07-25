import axios from "axios";
import { BASE_URL } from "../../utils/url";
import {getUserFromStorage} from "../../utils/getUserFromStorage";

//!Get the token
const token = getUserFromStorage();

//!Add Category
export const addCategoryAPI = async ({ name, type }) => {
    const response = await axios.post(`${BASE_URL}/categories/create`, {
        name,
        type,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


//!List Categories
export const listCategoriesAPI = async () => {
    const response = await axios.get(`${BASE_URL}/categories/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


//!Update Category
export const updateCategoryAPI = async ({ id, name, type }) => {
    const response = await axios.put(`${BASE_URL}/categories/update/${id}`, {
        name,
        type,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//!delete Category
export const deleteCategoryAPI = async ({id}) => {
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}