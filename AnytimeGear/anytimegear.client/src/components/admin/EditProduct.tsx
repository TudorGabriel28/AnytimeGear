import { Box, Button, TextField } from "@mui/material";
import { productService } from "../../services/product.service";
import { IAddProductPayload,  } from "../../models/product.model";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EditProductPage() {
    const { id } = useParams();
    useEffect(() => {
        getProduct();
    }, []);

    async function getProduct() {
        if (id === undefined) return;
        console.log(`id = ${id}`);
        const response = await productService.fetch(parseInt(id));
        console.log(`name = ${response.name}`);
        setName(response.name);
        setBrand(response.brand);
        setModel(response.model);
        setDescription(response.description);
        setProductPicture(response.productPicture);
        setPrice(response.price);
        setCapacity(response.capacity);
        setReplacementValue(response.replacementValue);
        setsubcategoryId(response.subcategory.id);
    }
    //const { product }: any = useLoaderData();

    const [name, setName] = useState<string>(" ");
    const [brand, setBrand] = useState<string>(" ");
    const [model, setModel] = useState<string>(" ");
    const [description, setDescription] = useState<string>(" ");
    const [productPicture, setProductPicture] = useState<string>(" ");
    const [price, setPrice] = useState<number>(0);
    const [capacity, setCapacity] = useState<number>(0);
    const [replacementValue, setReplacementValue] = useState<number>(0);
    const [subcategoryId, setsubcategoryId] = useState<number>(0);

    const handleNameSubmit = (event: any) => {
        setName(event.target.value);
        console.log("Product name: " + event.target.value);
    }

    const handleBrandSubmit = (event: any) => {
        setBrand(event.target.value);
        console.log("Product brand: " + event.target.value);
    }

    const handleModelSubmit = (event: any) => {
        setModel(event.target.value);
        console.log("Product model: " + event.target.value);
    }

    const handleDescriptionSubmit = (event: any) => {
        setDescription(event.target.value);
        console.log("Product description: " + event.target.value);
    }

    const handleProductPictureSubmit = (event: any) => {
        setProductPicture(event.target.value);
        console.log("Product product picture: " + event.target.value);
    }

    const handlePriceSubmit = (event: any) => {
        setPrice(event.target.value);
        console.log("Product price: " + event.target.value);
    }

    const handleCapacitySubmit = (event: any) => {
        setCapacity(event.target.value);
        console.log("Product capacity: " + event.target.value);
    }

    const handleReplacementValueSubmit = (event: any) => {
        setReplacementValue(event.target.value);
        console.log("Product replacement value: " + event.target.value);
    }

    const handleSubcategoryIdSubmit = (event: any) => {
        setsubcategoryId(event.target.value);
        console.log("Product replacement value: " + event.target.value);
    }

    async function editProduct() {
        console.log("Editing product: " + name);
        const payload: IAddProductPayload = { name, brand, model, description, productPicture, price, capacity, replacementValue, subcategoryId };
        if (id === undefined) return;
        console.log("Editing product: " + id);
        await productService.update(payload, parseInt(id));
        console.log("Edited");
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h2>Edit Product</h2>
            <div>
                <Link to="/admin/products">
                    <button>Back</button>
                </Link>
            </div>
            <TextField
                id="outlined-controlled"
                label="Product Name"
                value={name}
                onChange={handleNameSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Brand"
                value={brand}
                onChange={handleBrandSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Model"
                value={model}
                onChange={handleModelSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Description"
                value={description}
                onChange={handleDescriptionSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Picture"
                value={productPicture}
                onChange={handleProductPictureSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Price"
                value={price}
                onChange={handlePriceSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Capacity"
                value={capacity}
                onChange={handleCapacitySubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Replacement Value"
                value={replacementValue}
                onChange={handleReplacementValueSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Subcategory Id"
                value={subcategoryId}
                onChange={handleSubcategoryIdSubmit}
            />
            <Button
                onClick={async () => { await editProduct(); }}
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    width: '50px',
                    '&:hover': { 
                        bgcolor: 'black', 
                    }
                }}
            > Edit </Button>
        </Box>
    );
}