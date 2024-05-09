import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { IAddSubCategoryPayload } from "../../models/subcategory.model";
import { subCategoryService } from "../../services/subcategory.service";

export default function AddSubCategory() {
    
    const [name, setName] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");

    const handleNameSubmit = (event: any) => {
        setName(event.target.value);
        console.log("SubCategory name: " + event.target.value);
    }

    const handleCategoryNameSubmit = (event: any) => {
        setCategoryName(event.target.value);
        console.log("Category name: " + event.target.value);
    }
    async function addSubCategory() {
        console.log("Adding subCategory: " + name);
        const payload: IAddSubCategoryPayload = { name, categoryName };
        await subCategoryService.add(payload);
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
            <h2>Add SubCategory</h2>
            <TextField
                id="outlined-controlled"
                label="SubCategory Name"
                value={name} 
                onChange={handleNameSubmit}
            />
            <TextField
                id="outlined-controlled"
                label="Category Name"
                value={categoryName}
                onChange={handleCategoryNameSubmit}
            />
            <button onClick={addSubCategory}>Add</button>
            {/*<Form method="post">*/}
            {/*    <button type="submit">New</button>*/}
            {/*</Form>*/}
        </Box>
    );
}

