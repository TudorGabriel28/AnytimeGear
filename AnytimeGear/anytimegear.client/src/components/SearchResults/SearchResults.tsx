import { useLoaderData } from "react-router-dom";

export async function searchResultsLoader({ request }: any) {

    const searchParams = new URL(request.url).searchParams;

    const productsPayload = {
        categoryName: searchParams.get('categoryName'),
        subcategoryName: searchParams.get('subcategoryName'),
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        quantity: searchParams.get('quantity'),
    };
    console.log(productsPayload);
    // fetch products

    const products = ["Products"];

    return { products };
}

interface SearchResultsLoader {
    products: string[];
    }

function SearchResults() {

    const { products } = useLoaderData() as SearchResultsLoader;

    return <>
        <h1>Search Results</h1>
        <h3>{products[0]}</h3>
    </>
    
}

export default SearchResults
