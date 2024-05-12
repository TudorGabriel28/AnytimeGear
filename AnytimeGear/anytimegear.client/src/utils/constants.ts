import { SortKey, SortOrder } from "../models/product.model"

const ALL_CATEGORIES_NAME = 'All Categories'

export { ALL_CATEGORIES_NAME }

export interface ISortOption {
    title: string, key: SortKey, order: SortOrder
}

export const SORT_OPTIONS: ISortOption[] = [
    { title: 'Newest', key: 'createdAt', order: 'asc' },
    { title: 'Price (lowest first)', key: 'price', order: 'asc' },
    { title: 'Price (highest first)', key: 'price', order: 'desc' },
]