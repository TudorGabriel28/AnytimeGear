import { IProductList, IProductListPayload } from '../models/product.model'
import { AxiosResponse } from "axios";
import { apiClient } from "../utils/api-client";
import { IGetProductResponse } from "../models/product.model";

class ProductService {
    async fetchAll(payload: IProductListPayload ): Promise<IProductList> {
        try {
            const response: AxiosResponse = await apiClient.post('/Products/', payload)

            return response.data
        } catch (err) {
            console.log(err)
            return {
                items: [], totalCount: 0, minPrice: 0, maxPrice: 0, brands: [], sortKey: 'createdAt', sortOrder: 'asc', checkedBrandNames: []
            }
        }
    }

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