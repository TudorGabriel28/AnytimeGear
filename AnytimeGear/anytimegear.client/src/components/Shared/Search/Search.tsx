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
import { SearchProps } from '../../../models/search.model'
import CategorySelect from './CategorySelect'
import { useContext, useEffect, useRef, useState } from 'react'
import { SearchContext } from '../../../context/SearchContext'
import SubcategorySelect from './SubcategorySelect'
import dayjs, { Dayjs } from 'dayjs'


const StyledDateTimePicker = styled(DateTimePicker)(
    () => `
    .MuiOutlinedInput-root {
      border-radius: 10em;
    }
  `
)

const SearchButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#35977d",
    '&:hover': {
        backgroundColor: "#2c7e68",
    },

}));

function Search({ onSubmit }: {onSubmit: Function}) {
    
    const initialErrorState = { value: false, helperText: '' }
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');

    const { startDate, endDate, quantity, setStartDate, setEndDate, setQuantity, subcategory } = useContext(SearchContext);
    const [quantityError, setQuantityError] = useState(initialErrorState)
    const [subcategoryError, setSubcategoryError] = useState(initialErrorState)
    const [startDateError, setStartDateError] = useState(initialErrorState)
    const [endDateError, setEndDateError] = useState(initialErrorState)

    const [localStartDate, setLocalStartDate] = useState<Dayjs | null>(startDate)
    const [localEndDate, setLocalEndDate] = useState<Dayjs | null>(endDate)
    const [localQuantity, setLocalQuantity] = useState<number | null>(quantity)
    const [submitPressed, setSubmitPressed] = useState(false)

    const handleSubmit = (event: React.MouseEvent) => {
        let anyErrors = false;

        // Validate inputs
        if (localQuantity === null || localQuantity <= 0) {
            setQuantityError({ value: true, helperText: 'Please enter a valid quantity' });
            anyErrors = true;
        }

        if (subcategory.name === '') {
            setSubcategoryError({ value: true, helperText: 'Please select a subcategory' });
            anyErrors = true;
        }

        if (localStartDate === null) {
            setStartDateError({ value: true, helperText: 'Please select a start date' });
            anyErrors = true;
        }

        if (localEndDate === null) {
            setEndDateError({ value: true, helperText: 'Please select an end date' });
            anyErrors = true;
        }

        if (!anyErrors) {
            setStartDate(localStartDate);
            setEndDate(localEndDate);
            setQuantity(localQuantity);
            setSubmitPressed(true);
        }
    }

    useEffect(() => {
        if (submitPressed && startDate === localStartDate && endDate === localEndDate && quantity === localQuantity) {
            onSubmit();
            setSubmitPressed(false);
            setQuantityError(initialErrorState);
            setSubcategoryError(initialErrorState);
            setStartDateError(initialErrorState);
            setEndDateError(initialErrorState);
        }
    }, [startDate, endDate, quantity, submitPressed]);





    return (
        <>
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    pb: 4,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div style={{ width: '100%', marginBottom: '1em' }}>
                    <CategorySelect
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '100%',
                    }}
                >
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            Subcategory
                        </Typography>
                        <SubcategorySelect error={subcategoryError} />
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            Start date
                        </Typography>
                        <StyledDateTimePicker
                            label="Add date"
                            sx={{ mr: 2 }}
                            value={localStartDate}
                            onChange={(newValue) => setLocalStartDate(newValue)}
                            minDate={today}
                            slotProps={{
                                textField: {
                                    helperText: startDateError.helperText,
                                    error: startDateError.value,
                                },
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1 }}
                        >
                            End date
                        </Typography>
                        <StyledDateTimePicker
                            label="Add date"
                            value={localEndDate}
                            onChange={(newValue) => setLocalEndDate(newValue)}
                            sx={{ mr: 2 }}
                            minDate={tomorrow}
                            slotProps={{
                                textField: {
                                    helperText: endDateError.helperText,
                                    error: endDateError.value,
                                },
                            }}
                        />
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
                            label={localQuantity == null ? 'Add quantity' : ' '}
                            InputLabelProps={{ shrink: false }}
                            value={localQuantity == null ? '' : localQuantity}
                            type="number"
                            sx={{ mr: 2 }}
                            InputProps={{ sx: { borderRadius: 10 }, inputProps: { min: 1 } }}
                            onChange={(e) =>
                                setLocalQuantity(e.target.value as unknown as number)
                            }
                            error={quantityError.value}
                            helperText={quantityError.helperText}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, mb: 1, ml: 1, opacity: 0 }}
                        >
                            Dummy
                        </Typography>
                        <SearchButton
                            onClick={handleSubmit}
                            variant="contained"
                            startIcon={<SearchIcon />}
                            size="large"
                            sx={{
                                borderRadius: 8,
                                py: 1.7,
                            }}
                        >
                            Search
                        </SearchButton>
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default Search
