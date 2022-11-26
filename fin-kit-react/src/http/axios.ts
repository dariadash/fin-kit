import AxiosLib from "axios";

export const axios = AxiosLib.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})
