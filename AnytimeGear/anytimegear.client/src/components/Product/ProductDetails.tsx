import { useLoaderData } from "react-router-dom";

export async function productLoader({ params }: any) {
  console.log(params.productId);
  // Fetch product from API
  //const product = await productService.fetchProduct(params.productId);
  //return { product };

  return null;
}

function ProductDetails() {
  //const { product }: any = useLoaderData();

  return <p>Hello world!</p>;
}

export default ProductDetails;
