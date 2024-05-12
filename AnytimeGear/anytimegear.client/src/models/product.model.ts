import { Dayjs } from "dayjs"
import { ISubcategory } from "./subcategory.model"

export interface IProduct {
    id: number
    name: string
    brand: string
    model: string
    description: string
    price: number
    quantity: number
    replacementValue: number
    subcategory: ISubcategory
    stock: number
}

export interface IProductList {
    items: IProduct[],
    totalCount: number,
    minPrice: number,
    maxPrice: number,
    brands: IProductBrand[],
    sortKey: SortKey,
    sortOrder: SortOrder,
    checkedBrandNames: string[]
}

export interface IProductBrand {
    name: string,
    count: number
}

export interface IProductListPayload {
    categoryId: number,
    subcategoryId: number,
    startDate: Dayjs | undefined,
    endDate: Dayjs | undefined,
    quantity: number | undefined,
    sortKey: SortKey,
    sortOrder: SortOrder,
    checkedBrandNames: string[]
}

export type SortKey = 'createdAt' | 'price'
export type SortOrder = 'asc' | 'desc'