import { apiClient } from '../utils/api-client'

class CategoryService {
    async fetchAll() {
        return await apiClient.get('/categories')
    }

    async add(category: ICategory) {
        await apiClient.post("/categories", category);
        console.log("Category added successfully: " + category.name);
    }
}

export const categoryService = new CategoryService()
