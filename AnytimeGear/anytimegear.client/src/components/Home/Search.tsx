import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Button,
    styled,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from 'react'
import { SearchProps } from '../../models/search.model'
import SearchCategories from './SearchCategories'
import { ALL_CATEGORIES_NAME } from '../../utils/constants'
import dayjs, { Dayjs } from 'dayjs'
import { redirect, useNavigate } from 'react-router-dom'

function Search({ categories, subcategories }: SearchProps) {
    const [subcategoryName, setSubcategoryName] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>(categories[0].name);
    const [startDate, setStartDate] = useState<Dayjs | null>();
    const [endDate, setEndDate] = useState<Dayjs | null>();
    const [quantity, setQuantity] = useState<number| null>();

    const handleChange = (event: SelectChangeEvent) => {
        setSubcategoryName(event.target.value as string)
    }

    const StyledDateTimePicker = styled(DateTimePicker)(
        () => `
    .MuiOutlinedInput-root {
      border-radius: 10em;
    }
  `
    )

    const navigate = useNavigate();

    const sendSearchParams = () => {

        const queryParams = new URLSearchParams();
        queryParams.append('subcategoryName', subcategoryName);
        queryParams.append('categoryName', categoryName);
        if (startDate) {
            queryParams.append('startDate', startDate.toISOString());
        }
        if (endDate) {
            queryParams.append('endDate', endDate.toISOString());
        }
        if (quantity) {
            queryParams.append('quantity', quantity.toString());
        }

        const searchUrl = `/search?${queryParams.toString()}`;
        
        return navigate(searchUrl);
    };


    return (
        <>
            <Paper
                variant="outlined"
                sx={{ mt: 5, p: 2, pb: 4, borderRadius: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            >
                <div style={{ width: '100%', marginBottom: '1em' }}>
                    <SearchCategories categories={categories} categoryName={categoryName} setCategoryName={setCategoryName} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' } }>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            Subcategory
                        </Typography>
                        <FormControl sx={{ width: '10em', mr: 2 }}>
                            <InputLabel id="demo-simple-select-label" shrink={false} sx={{ display: subcategoryName == '' ? 'block' : 'none'}} >
                                Select one
                            </InputLabel>
                            <Select
                                id="demo-simple-select"
                                value={subcategoryName}
                                onChange={handleChange}
                                sx={{ borderRadius: 10 }}
                            >
                                {subcategories.map((subcategory) => {
                                    if (subcategory.category.name === categoryName || categoryName == ALL_CATEGORIES_NAME) {
                                        return (
                                            <MenuItem
                                                key={subcategory.id}
                                                value={subcategory.name}
                                            >
                                                {subcategory.name}
                                            </MenuItem>
                                        );
                                    }
                                    return null;
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            Start date
                        </Typography>
                        <StyledDateTimePicker label="Add date"
                            sx={{ mr: 2 }} value={startDate}
                            onChange={(newValue) => setStartDate(newValue)} />
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            End date
                        </Typography>
                        <StyledDateTimePicker label="Add date" value={endDate}
                            onChange={(newValue) => setEndDate(newValue)} sx={{ mr: 2 }} />
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            Quantity
                        </Typography>
                        <TextField
                            id="outlined-number"
                            label={quantity == undefined ? "Add quantity" : " "}
                            InputLabelProps={{ shrink: false }}
                            value={quantity}
                            type="number"
                            sx={{ mr: 2 }}
                            InputProps={{ sx: { borderRadius: 10 } }}
                            onChange={(e) => setQuantity(e.target.value as unknown as number)}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1, opacity: 0 }}
                        >
                            Dummy
                        </Typography>
                            <Button
                            onClick={sendSearchParams}
                            variant="contained"
                            startIcon={<SearchIcon />}
                            size="large"
                            sx={{ borderRadius: 8, py: 1.7, bgcolor: '#35977d' }}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                </Paper>
        </>
    )
}

export default Search
