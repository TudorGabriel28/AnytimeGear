import { AxiosResponse } from 'axios'
import { apiClient } from '../utils/api-client'
import { IGetCategoriesResponse } from '../models/category.model'

class CategoryService {
    async fetchAll(): Promise<IGetCategoriesResponse> {
        try {
            const response: AxiosResponse = await apiClient.get('/Categories')

            return response.data
        } catch (err) {
            console.log(err)
            return { items: [], count: 0 }
        }
    }
}

export const categoryService = new CategoryService()
