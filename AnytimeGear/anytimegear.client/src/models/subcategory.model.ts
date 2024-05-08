import { IGetAll } from "./base.model";

export interface ISubCategory {
    id: number;
    name: string;
    categoryName: string;
}

export interface IAddSubCategoryPayload {
    name: string;
    categoryName: string;
}

export interface IGetSubCategoriesResponse extends IGetAll<ISubCategory[]> { }



