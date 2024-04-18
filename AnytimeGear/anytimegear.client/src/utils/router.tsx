import App from '../App.tsx'
import Error from '../components/Error.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Contact from '../components/Contact.tsx'
import Home from '../components/Home/Home.tsx'
import About from '../components/About.tsx'
import ProductDetails, {
    productLoader,
} from '../components/Product/ProductDetails.tsx'

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
        ],
    },
])
