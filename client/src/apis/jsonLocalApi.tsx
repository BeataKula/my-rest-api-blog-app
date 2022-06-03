import axios from "axios";
const JSON_LOCAL_BASE_URL = "http://localhost:3001";

export default axios.create({
    baseURL: JSON_LOCAL_BASE_URL,
});

export const getPosts: any = async () => {
    return await axios.get(JSON_LOCAL_BASE_URL + "/posts");
};

export const getUserById: any = async (id: number) => {
    return await axios.get(`${JSON_LOCAL_BASE_URL}/users/${id}`);
};
