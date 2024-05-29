import App from '../App.tsx'
import Error from '../components/Error.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Contact from '../components/Contact.tsx'
import Home from '../components/Home/Home.tsx'
import About from '../components/About.tsx'
import SearchResults from '../components/SearchResults/SearchResults.tsx'
import { SearchContextProvider } from '../context/SearchContext.tsx'
import SignInPage from '../components/Identity/SignIn/SignInPage.tsx'
import AddCategory from '../components/Admin/AddCategory.tsx'
import { CategoriesPage } from '../components/Admin/Categories.tsx'
import AddSubcategory from '../components/Admin/AddSubcategory.tsx'
import { SubcategoriesPage } from '../components/Admin/Subcategories.tsx'

import SignUpPage from '../components/Identity/SignUp/SignUpPage.tsx'
import ProductDetails from '../components/Product/ProductDetails.tsx'
import { ProductsPage } from '../components/Admin/Products.tsx'
import EditProductPage from '../components/Admin/EditProduct.tsx'
import AddProductPage from '../components/Admin/AddProduct.tsx'
import Rentals from '../components/Rentals/Rentals.tsx'
import AdminGuard from '../components/Admin/AdminGuard.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'search',
                element: <SearchResults />,
            },
            {
                path: 'products/:id',
                element: <ProductDetails />,
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
                path: 'sign-up',
                element: <SignUpPage/>
            },
            {
                path: 'sign-in',
                element: <SignInPage/>
            },
            {
                path: 'products/:productId',
                element: <ProductDetails />,
            },
            {
                path: 'rentals',
                element: <Rentals />,
            },
            {
                path: "admin/categories/add",
                element: <AdminGuard><AddCategory/></AdminGuard>
            },
            {
                path: "admin/categories",
                element: <AdminGuard><CategoriesPage /></AdminGuard>
            },
            {
                path: "admin/subcategories/add",
                element: <AdminGuard><AddSubcategory /></AdminGuard>
            },
            {
                path: "admin/subcategories",
                element: <AdminGuard><SubcategoriesPage /></AdminGuard>
            },
            {
                path: "admin/products/add",
                element: <AdminGuard><AddProductPage /></AdminGuard>
            },
            {
                path: "admin/products",
                element: <AdminGuard><ProductsPage /></AdminGuard>
            },
            {
                path: `admin/products/:id`,
                element: <AdminGuard><EditProductPage /></AdminGuard>,
            },
        ],
    },
])