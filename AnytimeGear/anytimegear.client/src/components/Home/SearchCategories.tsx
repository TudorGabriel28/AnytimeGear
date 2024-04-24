import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { SearchCategoriesProps } from '../../models/search.model';

export default function SearchCategories({ categories, categoryName, setCategoryName }: SearchCategoriesProps) {
    
    return (
        <Box sx={{  width: '100%' }}>
            <RadioGroup
                orientation="horizontal"
                aria-labelledby="segmented-controls-example"
                name="categoryName"
                value={categoryName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCategoryName(event.target.value)
                }
                sx={{
                    minHeight: 48,
                    padding: '4px',
                    borderRadius: '30px',
                    //bgcolor: 'neutral.softBg',
                    bgcolor: '#eee',
                    '--RadioGroup-gap': '4px',
                    '--Radio-actionRadius': '8px',
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'
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
                            borderRadius: '30px'
                        }}
                        slotProps={{
                            action: ({ checked }) => ({
                                sx: {
                                    ...(checked && {
                                        bgcolor: 'background.surface',
                                        boxShadow: 'sm',
                                        '&:hover': {
                                            bgcolor: 'background.surface'
                                        },
                                        borderRadius: '30px'
                                    }),
                                },
                            }),
                        }}
                    />
                ))}
            </RadioGroup>
        </Box>
    );
}
