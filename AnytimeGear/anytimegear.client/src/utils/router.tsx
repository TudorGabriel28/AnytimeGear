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
import SignUpPage from '../components/Identity/SignUp/SignUpPage.tsx'
import SignInPage from '../components/Identity/SignIn/SignInPage.tsx'
import AddCategory from '../components/Admin/AddCategory.tsx'
import { CategoriesPage } from '../components/Admin/Categories.tsx'
import AddSubcategory from '../components/Admin/AddSubcategory.tsx'
import { SubcategoriesPage } from '../components/Admin/Subcategories.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                element: <SearchContextProvider />,
                children: [
                    { index: true, element: <Home />},
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
                path: 'sign-up',
                element: <SignUpPage/>
            },
            {
                path: 'sign-in',
                element: <SignInPage/>
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
        ],
    },
])
