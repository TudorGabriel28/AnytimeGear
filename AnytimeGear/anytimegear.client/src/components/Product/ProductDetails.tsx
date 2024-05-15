import { useLoaderData } from "react-router-dom";
import { productService } from "../../services/product.service";

export async function productLoader({ params }: any) {
    console.log(params.productId);
    const product = await productService.fetch(params.productId);
    return { product };
}

function ProductDetails() {
    const { product }: any = useLoaderData();

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <div style={{
                color: "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                maxWidth: "600px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}>
                <img src={product.productPicture} alt={product.name} style={{ width: "100%" }} />
                <h2 style={{ fontSize: "24px", margin: "10px 0" }}>{product.name}</h2>
                <p style={{ fontSize: "18px", margin: "5px 0" }}>Brand: {product.brand}</p>
                <p style={{ fontSize: "18px", margin: "5px 0" }}>Description: {product.description}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ fontSize: "20px", margin: "5px 0" }}>Price: ${product.price}</p>
                    <p style={{ fontSize: "16px", margin: "5px 10px" }}>Replacement Value: ${product.replacementValue}</p>
                </div>
                <button style={{ padding: "10px 20px", fontSize: "18px", marginTop: "20px" }}>Rent</button>
            </div>
        </div>
    );
}

export default ProductDetails;