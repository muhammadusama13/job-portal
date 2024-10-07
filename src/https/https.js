import axios from "axios"
import getHeader from "../utils/getHeader"

const BASE_URL = 'http://localhost:5000/api/v1/'


const API = axios.create({
    baseURL: BASE_URL,
})

let header;

const get = async (url) => {
    header = getHeader()
    return await API.get(url, header)
}
const post = async (url, payload) => {
    header = getHeader()
    return await API.post(url, payload, header)
}
const destory = async (url) => {
    header = getHeader()
    return await API.delete(url, header)
}


export default { get, post, destory }