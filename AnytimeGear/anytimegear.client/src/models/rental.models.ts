import { Dayjs } from "dayjs";
import { IProduct } from "./product.model";

export interface ICreateRentalPayload {
    productId: number,
    quantity: number,
    startDate: Dayjs,
    endDate: Dayjs
}

export interface IRental {
    id: number,
    productName: string,
    price: number,
    startDate: string,
    endDate: string,
    quantity: number,
    completed: boolean
}