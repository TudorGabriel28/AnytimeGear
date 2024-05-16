import { IProduct, IProductList, IProductListPayload } from '../models/product.model'
import { AxiosResponse } from "axios";
import { apiClient } from "../utils/api-client";
import { ICreateRentalPayload } from '../models/rental.models';

class RentalService {
    async create(payload: ICreateRentalPayload): Promise<void> {
        try {
            await apiClient.post('/Rentals/', payload)
        } catch (err) {
            console.log(err)
        }
    }

}

export const rentalService = new RentalService();