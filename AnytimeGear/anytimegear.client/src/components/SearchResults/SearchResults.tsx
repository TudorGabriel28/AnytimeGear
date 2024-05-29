import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
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
import { useCallback, useContext, useEffect, useState } from 'react'
import ProductPreview from './ProductPreview'
import Filters from './Filters'
import Sort from './Sort'
import { access } from 'fs/promises'
import { Dayjs } from 'dayjs'
import { productService } from '../../services/product.service'
import { IProduct, IProductBrand, SortKey, SortOrder } from '../../models/product.model'
import { SearchContext } from '../../context/SearchContext'
import { ISortOption, SORT_OPTIONS } from '../../utils/constants'

function SearchResults() {

    

    const [products, setProducts] = useState<IProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
    const [productTotalCount, setProductTotalCount] = useState<number>(0)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(100)
    const [selectedMin, setSelectedMin] = useState<number>(minPrice)
    const [selectedMax, setSelectedMax] = useState<number>(maxPrice)
    const [selectedSortOption, setSelectedSortOption] = useState<ISortOption>(SORT_OPTIONS[0])
    const [checkedBrandNames, setCheckedBrandNames] = useState<string[]>([]);
    const [brands, setBrands] = useState<IProductBrand[]>([]);
    const [clearFiltersPressed, setClearFiltersPressed] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)


    const { getRentalDurationInDays, quantity, startDate, endDate, subcategory, category } = useContext(SearchContext)

    const handleSortChange = (event: SelectChangeEvent) => {
        setSelectedSortOption(SORT_OPTIONS.find((option) => option.title === event.target.value)!)
    }

    const handleToggleOnBrand = (brand: IProductBrand) => () => {
        const currentIndex = checkedBrandNames.findIndex(cbn => cbn == brand.name);
        const newChecked = [...checkedBrandNames];

        if (currentIndex == -1) {
            newChecked.push(brand.name);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedBrandNames(newChecked);
    };

    const handleSearchSubmit = () => {
        fetchProductsAsync();
    }

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setSelectedMin(newValue[0]);
            setSelectedMax(newValue[1]);
        }
    }

    const applyPriceFilterOnProducts = () => {
        let filteredProducts = products.filter(p => p.price >= selectedMin! && p.price <= selectedMax!);
        setFilteredProducts(filteredProducts);
    }

    const clearAllFilters = () => {
        setClearFiltersPressed(true)
        setCheckedBrandNames([]);
    }

    const fetchProductsAsync = async () => {
        const productListResponse = await productService.fetchAll({ categoryId: category.id, subcategoryId: subcategory.id, startDate, endDate, quantity, sortKey: selectedSortOption.key, sortOrder: selectedSortOption.order, checkedBrandNames });

        if (productListResponse.errors) {

            const objString = Object.entries(productListResponse.errors)
                .map(([key, value]) => `${key}: ${value[0]}`)
                .join(', ');

            // @ts-ignore
            setErrorMessage(objString);
        } else {
            setErrorMessage(null);
        }

        if (selectedMin < productListResponse.minPrice && selectedMax > productListResponse.maxPrice) {
            setSelectedMin(productListResponse.minPrice);
            setSelectedMax(productListResponse.maxPrice);
        }
        setMinPrice(productListResponse.minPrice);
        setMaxPrice(productListResponse.maxPrice);

        
        setProducts(productListResponse.items);
        setProductTotalCount(productListResponse.totalCount);
        setSelectedSortOption(SORT_OPTIONS.find(s => s.key == productListResponse.sortKey && s.order == productListResponse.sortOrder)!);
        setBrands(productListResponse.brands);

    }

    const fetchProductsCallback = useCallback(fetchProductsAsync, [])


    const navigate = useNavigate()

    useEffect(() => {
        if (startDate === null || endDate === null || quantity === null) {
            navigate('/')
        } else {
            fetchProductsCallback()

        }
    }, [fetchProductsCallback])

    useEffect(() => {
        if (clearFiltersPressed) {
            setSelectedMin(minPrice)
            setSelectedMax(maxPrice)
            setClearFiltersPressed(false)
        }
        applyPriceFilterOnProducts();
    }, [selectedMin, selectedMax, products])

    useEffect(() => {
        
        fetchProductsAsync()
        
    }, [checkedBrandNames, selectedSortOption])


    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ mt: 2 }}>
                    <Search
                        onSubmit={handleSearchSubmit}

                    />
                </Box>

                <Container
                    disableGutters
                    sx={{ display: 'flex', width: '100%', mt: 5 }}
                >
                    <Filters min={minPrice} max={maxPrice} selectedMin={selectedMin} selectedMax={selectedMax} brands={brands} checkedBrandNames={checkedBrandNames} handleToggle={handleToggleOnBrand} handlePriceChange={handlePriceChange} onClear={clearAllFilters} />
                    <Box sx={{ flexGrow: 2, pl: 5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                {filteredProducts.length} products available
                                {errorMessage && <span style={{ color: 'red', fontSize: 'medium', marginLeft: '1em' }}>{errorMessage}</span>}
                            </Typography>
                            <Sort handleChange={handleSortChange} selectedSortOption={selectedSortOption} />
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 2 }}>
                            {
                                filteredProducts.map((product) => (
                                    <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none' }} >
                                        <ProductPreview key={product.id} product={product} getRentalDurationInDays={getRentalDurationInDays} quantity={quantity!} />
                                    </Link>
                            ))
                            }
                        </Box>
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export default SearchResults
