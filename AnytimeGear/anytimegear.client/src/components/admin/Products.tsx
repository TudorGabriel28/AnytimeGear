import { useEffect, useState } from "react";
import { productService } from "../../services/product.service";
import { IProduct } from "../../models/product.model";
import { Link } from "react-router-dom";

export function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await productService.fetchAllAdmin();
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(id: number) {
        try {
            await productService.delete(id);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    async function searchProducts(name: string) {
        try {
            const response = await productService.fetchByName(name);
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchTerm) {
            searchProducts(searchTerm);
        } else {
            getProducts();
        }
    };

    const contents = products === undefined ? (
        <p><em>Loading...</em></p>
    ) : (
        <div>
            <h1 id="tabelLabel">Products</h1>
            <Link to="/admin/products/add">
                <button>Add Product</button>
            </Link>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    style={{ flex: 1, marginRight: '10px', padding: '8px', backgroundColor: '#f0f0f0', color: 'black', boxSizing: 'border-box' }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
            </form>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Product Picture</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Replacement Value</th>
                        <th>Subcategory</th>
                        <th>Stock</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.model}</td>
                            <td>{product.description}</td>
                            <td>{product.productPicture}</td>
                            <td>{product.price}</td>
                            <td>{product.capacity}</td>
                            <td>{product.replacementValue}</td>
                            <td>{product.subcategory.name}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Link to={`/admin/products/${product.id}`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            {contents}
        </div>
    );
}
