import { Box, TextField } from "@mui/material";
import { categoryService } from "../../services/category.service";
import { IAddCategoryPayload } from "../../models/category.model";
import { useState } from "react";

export default function AddCategory() {
    
    const [name, setName] = useState<string>("");

    const handleSubmit = (event: any) => {
        setName(event.target.value);
        console.log("Category name: " + event.target.value);
    }
    async function addCategory() {
        console.log("Adding category: " + name);
        const payload: IAddCategoryPayload = { name };
        await categoryService.add(payload);
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
            <h2>Add Category</h2>
            <TextField
                id="outlined-controlled"
                label="Category Name"
                value={name} 
                onChange={handleSubmit}
            />
            <button onClick={addCategory}>Add</button>
            {/*<Form method="post">*/}
            {/*    <button type="submit">New</button>*/}
            {/*</Form>*/}
        </Box>
    );
}

