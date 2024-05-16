import App from '../App.tsx'
import Error from '../components/Error.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Contact from '../components/Contact.tsx'
import Home from '../components/Home/Home.tsx'
import About from '../components/About.tsx'
import ProductDetails, {
    productLoader,
} from '../components/Product/ProductDetails.tsx'
import SearchResults from '../components/SearchResults/SearchResults.tsx'
import { SearchContextProvider } from '../context/SearchContext.tsx'
import AddCategory from '../components/admin/AddCategory.tsx'
import { CategoriesPage } from '../components/admin/Categories.tsx'
import AddSubcategory from '../components/admin/AddSubcategory.tsx'
import { SubcategoriesPage } from '../components/admin/Subcategories.tsx'
import AddProductPage from '../components/admin/AddProduct.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                element: <SearchContextProvider />,
                children: [
                    { index: true, element: <Home /> },
                    {
                        path: 'search',
                        element: <SearchResults />,
                    },
                ]
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'products/:productId',
                loader: productLoader,
                element: <ProductDetails />,
            },
            {
                path: "admin/categories/add",
                element: <AddCategory />
            },
            {
                path: "admin/categories",
                element: <CategoriesPage />
            },
            {
                path: "admin/subcategories/add",
                element: <AddSubcategory />
            },
            {
                path: "admin/subcategories",
                element: <SubcategoriesPage />
            },
            {
                path: "admin/products/add",
                element: <AddProductPage />
            },
        ],
    },
])