const ProductPage = () => {
    const product = {
        name: 'Example Product',
        brand: 'rere',
        model: 'rerere',
        description: 'This is an example product description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '$19.99',
        replacementvalue: '30$',
        imageUrl: 'https://via.placeholder.com/300',
    };

    return (
        <div className="product-page">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Model:</strong> {product.model}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <p><strong>Replacement value:</strong> {product.replacementvalue}</p>
            </div>
        </div>
    );
};

export default ProductPage;