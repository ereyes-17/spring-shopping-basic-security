import axios from "axios";
import { BASE_API_URL } from "../common/constants"
import { authHeader } from "./base.service";

const BASE_URL = BASE_API_URL + "/api/product";

class ProductService {
    saveProduct = (product) => {
        return axios.post(BASE_URL, product, {headers: authHeader()});
    }
    deleteProduct = (product) => {
        return axios.delete(BASE_URL + "/" + product.id, {headers: authHeader()});
    }
    getAllProducts = () => {
        return axios.get(BASE_URL)
    }
}


export default new ProductService();