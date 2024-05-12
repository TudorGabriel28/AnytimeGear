import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { ALL_CATEGORIES_NAME } from '../../../utils/constants'
import { useCallback, useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import { ISubcategory } from '../../../models/subcategory.model';
import { subcategoryService } from '../../../services/subcategory.service';
import { ITextFieldError } from '../../../models/error.model';

function SubcategorySelect({ error }: { error: ITextFieldError }) {

    const { category, subcategory, setSubcategory } = useContext(SearchContext);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

    
    const fetchSubcategories = useCallback(async () => {
        const subcategoryData = await subcategoryService.fetchAll();
        setSubcategories(subcategoryData);
    }, [])


    const handleSubcategorySelect = (event: SelectChangeEvent) => {
        const subcategoryName = event.target.value as string;
        setSubcategory(subcategories.filter(subcategory => subcategory.name === subcategoryName)[0])
    }

    useEffect(() => {
        fetchSubcategories()
            .catch(console.error);;
    }, [fetchSubcategories])


    return (
        <>
            <FormControl sx={{ width: '10em', mr: 2 }}>
                <InputLabel
                    id="demo-simple-select-label"
                    shrink={false}
                    sx={{
                        display:
                            subcategory.name == ''
                                ? 'block'
                                : 'none',
                    }}
                >
                    Select one
                </InputLabel>
                <FormControl error={error.value}>

                    <Select
                    id="demo-simple-select"
                    value={subcategory.name}
                    onChange={handleSubcategorySelect}
                    sx={{ borderRadius: 10 }}
                >
                    {subcategories.map((subcategory) => {
                        if (
                            subcategory.category.name ===
                            category.name ||
                            category.name == ALL_CATEGORIES_NAME
                        ) {
                            return (
                                <MenuItem
                                    key={subcategory.name}
                                    value={subcategory.name}
                                >
                                    {subcategory.name}
                                </MenuItem>
                            )
                        }
                        return null
                    })}
                </Select>

                    <FormHelperText>{error.helperText}</FormHelperText>
                </FormControl>
            </FormControl>
        </>
    );
}

export default SubcategorySelect;