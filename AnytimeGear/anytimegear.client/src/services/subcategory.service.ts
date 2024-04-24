import { AxiosResponse } from 'axios'
import { apiClient } from '../utils/api-client'
import { ISubcategory } from '../models/subcategory.model'

class SubcategoryService {
    async fetchAll(): Promise<ISubcategory[]> {
        try {
            const response: AxiosResponse =
                await apiClient.get('/Subcategories')

            return response.data
        } catch (err) {
            console.log(err)
            return [];
        }
    }
}

export const subcategoryService = new SubcategoryService()
