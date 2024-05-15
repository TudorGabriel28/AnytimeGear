import { IAddSubcategoryPayload, IGetSubcategoriesResponse } from '../models/subcategory.model'
import { apiGetClient, apiPostClient } from '../utils/api-client'
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
            return []
        }
    }

    async add(payload: IAddSubcategoryPayload) {
        try {
            await apiPostClient.post("/subcategories", payload).then((response) => {
                console.log("Subcategory added successfully: " + response.status);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const subcategoryService = new SubcategoryService()
