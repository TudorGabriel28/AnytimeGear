import { IProduct, IProductList, IProductListPayload } from '../models/product.model'
import { AxiosResponse } from "axios";
import { apiClient } from "../utils/api-client";
import { Dayjs } from 'dayjs';

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

    async fetchProduct(id: number, startDate: Dayjs, endDate: Dayjs): Promise<IProduct> {
        try {
            const response: AxiosResponse = await apiClient.get(`/Products/${id}?startDate=${startDate}&endDate=${endDate}`)

            return response.data
        } catch (err) {
            console.log(err)
            throw new Error('Failed to fetch product');
        }
    }
}

export const productService = new ProductService();