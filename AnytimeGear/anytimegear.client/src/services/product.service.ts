import { AxiosResponse } from "axios"
import { IAddProductPayload, IProduct, IProductList, IProductListPayload } from "../models/product.model"
import { apiClient, apiPostClient } from "../utils/api-client"
import { Dayjs } from "dayjs"

class ProductService {
    async fetchAll(payload: IProductListPayload): Promise<IProductList> {
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
    async fetchAllAdmin(): Promise<IProduct[]> {
        try {
            const response: AxiosResponse = await apiClient.get('/Products/Admin')

            return response.data
        } catch (err) {
            console.log(err)
            return []
        }

    }
  
    async fetch(id: number): Promise<IProduct> {
        try {
            const response: AxiosResponse = await apiClient.get(`/Admin/Products/${id}`)

            return response.data
        } catch (err) {
            console.log(err)
            throw new Error('Failed to fetch product');
        }
    }


    async fetchProduct(id: number, startDate: Dayjs, endDate: Dayjs): Promise<IProduct> {
        try {
            const response: AxiosResponse = await apiClient.get(`/Products/${id}?startDate=${startDate}&endDate=${endDate}`)

            return response.data
        } catch (err) {
            console.log(err)
            throw new Error('Failed to fetch product');
        }
    }

    async add(payload: IAddProductPayload) {
        try {
            await apiPostClient.post("/products/create", payload).then((response) => {
                console.log("Product added successfully: " + response.status);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(payload: IAddProductPayload, id: number) {
        try {
            await apiClient.put(`/products/${id}`, payload).then((response) => {
                console.log("Product edited successfully: " + response.status);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id: number) {
        try {
            await apiClient.delete(`/products/${id}`).then((response) => {
                console.log("Product deleted successfully: " + response.status);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch product');
        }
    }
}

export const productService = new ProductService();