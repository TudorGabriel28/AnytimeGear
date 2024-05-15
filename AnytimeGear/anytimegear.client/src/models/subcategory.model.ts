import { IGetAll } from "./base.model";
import { ICategory } from './category.model'

export interface ISubcategory {
    id: number
    name: string
    category: ICategory
}

export interface IAddSubcategoryPayload {
    name: string;
    categoryName: string;
}

export interface IGetSubcategoriesResponse extends IGetAll<ISubcategory[]> { }



