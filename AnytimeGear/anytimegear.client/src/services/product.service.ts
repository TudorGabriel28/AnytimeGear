import { AxiosResponse } from 'axios'
import { apiClient, apiPostClient } from '../utils/api-client'
import { IProductList, IProductListPayload } from '../models/product.model'
import { IGetProductResponse } from "../models/product.model";
import { IAddProductPayload } from "../models/product.model";

class ProductService {
    async fetchAll(payload: IProductListPayload): Promise<IProductList> {
        try {
            const response: AxiosResponse = await apiClient.post('/Products/', payload)

            return response.data
        } catch (err) {
            console.log(err)
            return {
                items: [], totalCount: 0, minPrice: 0, maxPrice: 0, brands: [], sortKey: 'createdAt', sortOrder: 'asc'
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
    async add(payload: IAddProductPayload) {
        try {
            await apiPostClient.post("/products", payload).then((response) => {
                console.log("Product added successfully: " + response.status);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const productService = new ProductService();