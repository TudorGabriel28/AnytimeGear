import App from '../App.tsx'
import Error from '../components/Error.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Contact from '../components/Contact.tsx'
import Home from '../components/Home.tsx'
import About from '../components/About.tsx'
import ProductDetails, {
    productLoader,
} from '../components/Product/ProductDetails.tsx'
import AddCategory from '../components/admin/AddCategory.tsx'
import { CategoriesPage } from '../components/admin/Categories.tsx'
import AddSubCategory from '../components/admin/AddSubCategory.tsx'
import { SubCategoriesPage } from '../components/admin/SubCategories.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'contacts',
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
                element: <AddSubCategory />
            },
            {
                path: "admin/subcategories",
                element: <SubCategoriesPage />
            },
        ],
    },
])
