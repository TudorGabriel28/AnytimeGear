import { IAddSubCategoryPayload, IGetSubCategoriesResponse } from '../models/subcategory.model'
import { apiGetClient, apiPostClient } from '../utils/api-client'
import { AxiosResponse } from 'axios'

class SubCategoryService {
    async fetchAll(): Promise<IGetSubCategoriesResponse> {
        try {
            const response: AxiosResponse = await apiGetClient.get('/subcategories')
            return response.data
        } catch (err) {
            console.log(err)
            return { items: [], count: 0 }
        }
    }

    async add(payload: IAddSubCategoryPayload) {
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

export const subCategoryService = new SubCategoryService()
