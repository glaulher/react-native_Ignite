import axios from "axios";

const api = axios.create({
    //baseURL: 'http://192.168.5.146:3333',
    baseURL: 'http://10.101.0.239:3333',
});

export {api};
