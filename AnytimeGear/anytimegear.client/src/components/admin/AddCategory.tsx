import { useCallback, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { categoryService } from "../../services/category.service";
//import { Form, redirect } from "react-router-dom";

//export async function action({ request }) {
//    const formData = await request.formData();
//    const category: ICategory = formData.get("name");
//    await categoryService.add(category);
//    return redirect("/categories");
//}

function AddCategory() {
    
    const [name, setName] = useState<string>("");

    const addCategory = useCallback(async () => {
        const category: ICategory = { name };
        await categoryService.add(category);
    }, [])

    useEffect(() => {
        addCategory()
            .catch(console.error);
    }, [addCategory])
    
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-controlled"
                label="Category Name"
                value={name}
                name="name"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)}
            />
            {/*<Form method="post">*/}
            {/*    <button type="submit">New</button>*/}
            {/*</Form>*/}
        </Box>
    );
}

export default AddCategory;