import Box from '@mui/joy/Box'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import { categoryService } from '../../../services/category.service'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ICategory } from '../../../models/category.model'
import { SelectChangeEvent } from '@mui/material'
import { SearchContext } from '../../../context/SearchContext'

export default function CategorySelect() {

    const { category, setCategory } = useContext(SearchContext);
    const [categories, setCategories] = useState<ICategory[]>([]);



    const handleCategorySelect = (event: SelectChangeEvent) => {
        const categoryName = event.target.value as string
        setCategory(categories.filter(category => category.name === categoryName)[0])
    }

    const fetchCategories = useCallback(async () => {
        const categoryData = await categoryService.fetchAll();
        setCategories(categoryData);
        if (category.name === '') {
            setCategory(categoryData[0]);
        }
    }, [])
 
    useEffect(() => {
        
        fetchCategories()
            .catch(console.error);;
    }, [fetchCategories])

  
    return (
        
        <Box sx={{ width: '100%' }}>
            <RadioGroup
                orientation="horizontal"
                aria-labelledby="segmented-controls-example"
                name="categoryName"
                value={category.name}
                onChange={handleCategorySelect}
                sx={{
                    minHeight: 48,
                    padding: '4px',
                    borderRadius: '30px',
                    //bgcolor: 'neutral.softBg',
                    bgcolor: '#f4f4f4',
                    '--RadioGroup-gap': '4px',
                    '--Radio-actionRadius': '8px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                {categories.map((category) => (
                    
                    <Radio
                        key={category.name}
                        color="neutral"
                        value={category.name}
                        disableIcon
                        label={category.name}
                        variant="plain"
                        sx={{
                            px: 2,
                            py: 1.8,
                            alignItems: 'center',
                            borderRadius: '30px',
                        }}
                        slotProps={{
                            action: ({ checked }) => ({
                                sx: {
                                    ...(checked && {
                                        bgcolor: 'background.surface',
                                        boxShadow: 'sm',
                                        '&:hover': {
                                            bgcolor: 'background.surface',
                                        },
                                        borderRadius: '30px',
                                    }),
                                },
                            }),
                        }}
                    />
                ))}
            </RadioGroup>
        </Box>
    )
}
