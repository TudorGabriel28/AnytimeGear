import { Dayjs } from "dayjs"
import { ISubcategory } from "./subcategory.model"

export interface IProduct {
    id: number
    name: string
    brand: string
    model: string
    description: string
    productPicture: string
    price: number
    capacity: number
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
    checkedBrandNames: string[],
    errors?: Object
}

export interface IProductBrand {
    name: string,
    count: number
}

export interface IAddProductPayload {
    name: string;
    brand: string;
    model: string;
    description: string;
    productPicture: string;
    price: number;
    capacity: number;
    replacementValue: number;
    subcategoryId: number;
}

export interface IGetProductResponse extends IGetAll<IProduct[]> { }
export interface IGetAll<T> { }

export interface IProductListPayload {
    categoryId: number,
    subcategoryId: number,
    startDate: Dayjs | null,
    endDate: Dayjs | null,
    quantity: number | null,
    sortKey: SortKey,
    sortOrder: SortOrder,
    checkedBrandNames: string[]
}

export type SortKey = 'createdAt' | 'price'
export type SortOrder = 'asc' | 'desc'