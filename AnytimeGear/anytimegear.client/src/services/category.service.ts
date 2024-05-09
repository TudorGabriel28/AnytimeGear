import { apiGetClient, apiPostClient } from '../utils/api-client'
import { IAddCategoryPayload, IGetCategoriesResponse } from '../models/category.model'
import { AxiosResponse } from 'axios'

class CategoryService {
    async fetchAll(): Promise<IGetCategoriesResponse> {
        try {
            const response: AxiosResponse = await apiGetClient.get('/categories')
            return response.data
        } catch (err) {
            console.log(err)
            return { items: [], count: 0 }
        }
    }

    async add(payload: IAddCategoryPayload) {
        try {
            await apiPostClient.post("/categories", payload).then((response) => {
                console.log("Category added successfully: " + response.status);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const categoryService = new CategoryService()
