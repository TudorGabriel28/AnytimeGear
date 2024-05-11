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
                path: 'products/:productId',
                loader: productLoader,
                element: <ProductDetails />,
            },
        ],
    },
])
