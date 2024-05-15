import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { IAddSubcategoryPayload } from "../../models/subcategory.model";
import { subcategoryService } from "../../services/subcategory.service";

export default function AddSubcategory() {
    
    const [name, setName] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");

    const handleNameSubmit = (event: any) => {
        setName(event.target.value);
        console.log("Subcategory name: " + event.target.value);
    }

    const handleCategoryNameSubmit = (event: any) => {
        setCategoryName(event.target.value);
        console.log("Category name: " + event.target.value);
    }
    async function addSubcategory() {
        console.log("Adding subcategory: " + name);
        const payload: IAddSubcategoryPayload = { name, categoryName };
        await subcategoryService.add(payload);
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
            <h2>Add Subcategory</h2>
            <TextField
                id="outlined-controlled"
                label="Subcategory Name"
                value={name} 
                onChange={handleNameSubmit}
            />
            <TextField
                id="outlined-controlled"
                label="Category Name"
                value={categoryName}
                onChange={handleCategoryNameSubmit}
            />
            <button onClick={addSubcategory}>Add</button>
            {/*<Form method="post">*/}
            {/*    <button type="submit">New</button>*/}
            {/*</Form>*/}
        </Box>
    );
}

