import App from '../App.tsx'
import Error from '../components/Error.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Contact from '../components/Contact.tsx'
import Home, { homeLoader } from '../components/Home/Home.tsx'
import About from '../components/About.tsx'
import ProductDetails, {
    productLoader,
} from '../components/Product/ProductDetails.tsx'
import SearchResults, { searchResultsLoader } from '../components/SearchResults/SearchResults.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home />, loader: homeLoader },
            {
                path: 'search', element: <SearchResults/>, loader: searchResultsLoader
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
        ],
    },
])
