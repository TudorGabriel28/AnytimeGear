import { ICategory } from './category.model'

export interface ISubcategory {
    id: number
    name: string
    category: ICategory
}
