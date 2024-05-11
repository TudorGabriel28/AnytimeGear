import { useLoaderData, useLocation } from 'react-router-dom'
import { ICategory } from '../../models/category.model'
import { ISubcategory } from '../../models/subcategory.model'
import { categoryService } from '../../services/category.service'
import { subcategoryService } from '../../services/subcategory.service'
import Search from '../Shared/Search/Search'
import {
    Box,
    Container,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import ProductPreview from './ProductPreview'
import Filters from './Filters'
import Sort from './Sort'
import { access } from 'fs/promises'
import { Dayjs } from 'dayjs'

//export async function searchResultsLoader({ request }: any) {
//    const categoryData = await categoryService.fetchAll()
//    const subcategoryData = await subcategoryService.fetchAll()

//    const searchParams = new URL(request.url).searchParams

//    const productsPayload = {
//        categoryName: searchParams.get('categoryName'),
//        subcategoryName: searchParams.get('subcategoryName'),
//        startDate: searchParams.get('startDate'),
//        endDate: searchParams.get('endDate'),
//        quantity: searchParams.get('quantity'),
//    }
//    console.log(productsPayload)
//    // fetch products

//    const products = ['Products']

//    return {
//        products,
//        categories: categoryData.items,
//        subcategories: subcategoryData,
//    }
//}



//interface SearchResultsLoader {
//    products: string[]
//    categories: ICategory[]
//    subcategories: ISubcategory[]
//}


function SearchResults() {

    

    const [products, setProducts] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(100)
    const [sortOptions, setSortOptions] = useState([]);
    const [sortValue, setSortValue] = useState('')

    //const sortOptions = [
    //    { value: '1', name: 'Default' },
    //    { value: '2', name: 'Price (lowest first)' },
    //    { value: '3', name: 'Price (highest first)' },
    //]

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value)
    }

    const fetchCategories = useCallback(async () => {
        const categoryData = await categoryService.fetchAll();
        setCategories(categoryData);
        if (category.name === '') {
            setCategory(categoryData[0]);
        }
    }, [])

    useEffect(() => {

        fetchCategories()
            .catch(console.error);;
    }, [fetchCategories])


    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ mt: 2 }}>
                    <Search
                        onSubmit={() => { }}

                    />
                </Box>

                <Container
                    disableGutters
                    sx={{ display: 'flex', width: '100%', mt: 5 }}
                >
                    <Filters min={minPrice} max={maxPrice} />
                    <Box sx={{ flexGrow: 2, pl: 5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                134 products available
                            </Typography>
                            <Sort handleChange={handleSortChange} value={sortValue} sortOptions={sortOptions} />
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 2 }}>
                            <ProductPreview />
                            <ProductPreview />
                            <ProductPreview />
                            <ProductPreview />
                        </Box>
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default SearchResults
