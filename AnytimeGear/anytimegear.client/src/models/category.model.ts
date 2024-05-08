import { IGetAll } from "./base.model";

export interface ICategory {
    id: number;
    name: string;
}

export interface IAddCategoryPayload {
    name: string;
}

export interface IGetCategoriesResponse extends IGetAll<ICategory[]> { }



