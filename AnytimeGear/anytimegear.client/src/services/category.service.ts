import { AxiosResponse } from 'axios'
import { apiClient } from '../utils/api-client'
import { ICategory} from '../models/category.model'
import { apiPostClient } from '../utils/api-client'
import { IAddCategoryPayload } from '../models/category.model'

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
    
        // TODO: Keep either try catch block or then statement, no need for both
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
