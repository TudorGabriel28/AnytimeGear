import { apiClient } from '../utils/api-client'

class CategoryService {
    async fetchAll() {
        return await apiClient.get('/categories')
    }
}

export const categoryService = new CategoryService()
