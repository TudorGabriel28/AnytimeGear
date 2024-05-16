import { Box, TextField } from "@mui/material";
import { productService } from "../../services/product.service";
import { IAddProductPayload } from "../../models/product.model";
import { useState } from "react";

export default function AddProductPage() {
    const [name, setName] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [productPicture, setProductPicture] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [capacity, setCapacity] = useState<number>(0);
    const [replacementValue, setReplacementValue] = useState<number>(0);

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

    async function addProduct() {
        console.log("Adding product: " + name);
        const payload: IAddProductPayload = { name, brand, model, description, productPicture, price, capacity, replacementValue };
        await productService.add(payload);
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
            <h2>Add Product</h2>
            <TextField
                id="outlined-controlled"
                label="Product Name"
                value={name}
                onChange={handleNameSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Brand"
                value={name}
                onChange={handleBrandSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Model"
                value={name}
                onChange={handleModelSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Description"
                value={name}
                onChange={handleDescriptionSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Picture"
                value={name}
                onChange={handleProductPictureSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Price"
                value={name}
                onChange={handlePriceSubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Capacity"
                value={name}
                onChange={handleCapacitySubmit}
            />

            <TextField
                id="outlined-controlled"
                label="Product Replacement Value"
                value={name}
                onChange={handleReplacementValueSubmit}
            />
            <button onClick={addProduct}>Add</button>
            {/*<Form method="post">*/}
            {/*    <button type="submit">New</button>*/}
            {/*</Form>*/}
        </Box>
    );
}