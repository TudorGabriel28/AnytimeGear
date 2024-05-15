import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { ICategory } from '../models/category.model';
import { ISubcategory } from '../models/subcategory.model';
import { Outlet } from 'react-router-dom';

// Define the shape of the context data
interface ISearchContext {
    category: ICategory;
    subcategory: ISubcategory;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    quantity: number | null;
    setSubcategory: Function;
    setCategory: Function;
    setStartDate: Function;
    setEndDate: Function;
    setQuantity: Function;
    getRentalDurationInDays: Function;
}

const initialCategory = { id: 0, name: '' };
const initialSubcategory = { id: 0, name: '', category: initialCategory };

// Create the context with a default sortKey
export const SearchContext = React.createContext<ISearchContext>({
    category: initialCategory,
    subcategory: initialSubcategory,
    startDate: null,
    endDate: null,
    quantity: undefined,
    setSubcategory: () => { },
    setCategory: () => { },
    setStartDate: () => { },
    setEndDate: () => { },
    setQuantity: () => { },
    getRentalDurationInDays: () => 0
});

// Create a provider component
export const SearchContextProvider: React.FC = ({ children }: any) => {
    const [subcategory, setSubcategory] = useState<ISubcategory>(initialSubcategory);
    const [category, setCategory] = useState<ICategory>(initialCategory);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);

    const getRentalDurationInDays = () => startDate && endDate ? endDate.diff(startDate, 'days') : 0;

    return (
        <SearchContext.Provider value={{ category, subcategory, startDate, endDate, quantity, setCategory, setSubcategory, setStartDate, setEndDate, setQuantity, getRentalDurationInDays }}>
            <Outlet />
        </SearchContext.Provider>
    );
};