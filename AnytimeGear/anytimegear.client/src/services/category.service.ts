import { AxiosResponse } from 'axios'
import { apiClient } from '../utils/api-client'
import { ICategory, IGetCategoriesResponse } from '../models/category.model'

class CategoryService {
    async fetchAll(): Promise<ICategory[]> {
        try {
            const response: AxiosResponse = await apiClient.get('/Categories')

            return response.data
        } catch (err) {
            console.log(err)
            return []
        }
    }
}

export const categoryService = new CategoryService()
