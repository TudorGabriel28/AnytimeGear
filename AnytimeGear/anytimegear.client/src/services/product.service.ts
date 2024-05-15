import { AxiosResponse } from 'axios'
import { apiClient } from '../utils/api-client'
import { IProductList, IProductListPayload } from '../models/product.model'

class ProductService {
    async fetchAll(payload: IProductListPayload ): Promise<IProductList> {
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
}

export const productService = new ProductService()
