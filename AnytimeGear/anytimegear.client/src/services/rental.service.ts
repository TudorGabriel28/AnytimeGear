import { AxiosResponse } from "axios";
import { apiClient } from "../utils/api-client";
import { ICreateRentalPayload, IRental } from '../models/rental.models';

class RentalService {
    async create(payload: ICreateRentalPayload): Promise<void> {
        try {
            await apiClient.post('/Rentals/', payload)
        } catch (err) {
            console.log(err)
        }
    }

    async fetchAll(authToken: string): Promise<IRental[]> {
        try {
            const response: any = await apiClient.get(`/Rentals`, { headers: { Authorization: `Bearer ${authToken}` } });
            return response.data["$values"];
        } catch (err) {
            console.log(err)
            return []
        }
    }

}

export const rentalService = new RentalService();