import { ICategory } from './categoryName.model'
import { ISubcategory } from './subcategory.model'

export interface SearchProps {
    categories: ICategory[]
    subcategories: ISubcategory[]
}

export interface SearchCategoriesProps {
    categories: ICategory[];
    categoryName: string;
    setCategoryName: Function;
}