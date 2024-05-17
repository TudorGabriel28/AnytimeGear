import { AxiosResponse } from "axios";
import { apiClient } from "../utils/api-client";
import { ICreateRentalPayload, IRental } from '../models/rental.models';

class RentalService {
    async create(payload: ICreateRentalPayload, accessToken: string): Promise<void> {
        try {
            await apiClient.post('/Rentals/', payload, { headers: { Authorization: `Bearer ${accessToken}` } });
        } catch (err) {
            console.log(err)
        }
    }

    async fetchAll(accessToken: string): Promise<IRental[]> {
        try {
            const response: any = await apiClient.get(`/Rentals`, { headers: { Authorization: `Bearer ${accessToken}` } });
            return response.data;
        } catch (err) {
            console.log(err)
            return []
        }
    }

}

export const rentalService = new RentalService();