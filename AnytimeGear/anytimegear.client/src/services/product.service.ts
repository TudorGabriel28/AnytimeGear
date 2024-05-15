import { AxiosResponse } from "axios";
import { apiClient } from "../utils/api-client";
import { IGetProductResponse } from "../models/product.model";

class ProductService {
    async fetch(id: number): Promise<IGetProductResponse> {
        try {
            const response: AxiosResponse = await apiClient.get(`/Products/${id}`)

            return response.data
        } catch (err) {
            console.log(err)
            return { items: [], count: 0 }
        }
    }
}

export const productService = new ProductService();