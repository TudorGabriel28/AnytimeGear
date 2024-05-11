import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { ICategory } from '../models/category.model';
import { ISubcategory } from '../models/subcategory.model';
import { Outlet } from 'react-router-dom';

// Define the shape of the context data
interface ISearchContext {
    category: ICategory;
    subcategory: ISubcategory;
    startDate: Dayjs | undefined;
    endDate: Dayjs | undefined;
    quantity: number | undefined;
    setSubcategory: Function;
    setCategory: Function;
    setStartDate: Function;
    setEndDate: Function;
    setQuantity: Function;
}

const initialCategory = { id: 0, name: '' };
const initialSubcategory = { id: 0, name: '', category: initialCategory };

// Create the context with a default value
export const SearchContext = React.createContext<ISearchContext>({
    category: initialCategory,
    subcategory: initialSubcategory,
    startDate: undefined,
    endDate: undefined,
    quantity: undefined,
    setSubcategory: () => { },
    setCategory: () => { },
    setStartDate: () => { },
    setEndDate: () => { },
    setQuantity: () => { },
});

// Create a provider component
export const SearchContextProvider: React.FC = ({ children }: any) => {
    const [subcategory, setSubcategory] = useState<ISubcategory>(initialSubcategory);
    const [category, setCategory] = useState<ICategory>(initialCategory);
    const [startDate, setStartDate] = useState<Dayjs | undefined>();
    const [endDate, setEndDate] = useState<Dayjs | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>();

    

    return (
        <SearchContext.Provider value={{ category, subcategory, startDate, endDate, quantity, setCategory, setSubcategory, setStartDate, setEndDate, setQuantity }}>
            <Outlet />
        </SearchContext.Provider>
    );
};