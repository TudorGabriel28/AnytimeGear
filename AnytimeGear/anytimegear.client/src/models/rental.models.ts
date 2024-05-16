import { Dayjs } from "dayjs";

export interface ICreateRentalPayload {
    productId: number,
    userId: number,
    quantity: number,
    startDate: Dayjs,
    endDate: Dayjs
}