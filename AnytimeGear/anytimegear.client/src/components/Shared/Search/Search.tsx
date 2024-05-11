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
import { useContext } from 'react'
import { SearchContext } from '../../../context/SearchContext'
import SubcategorySelect from './SubcategorySelect'


const StyledDateTimePicker = styled(DateTimePicker)(
    () => `
    .MuiOutlinedInput-root {
      border-radius: 10em;
    }
  `
)

function Search({ onSubmit }: SearchProps) {
    
    

    const { startDate, endDate, quantity, setStartDate, setEndDate, setQuantity } = useContext(SearchContext);

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
                        <SubcategorySelect/>
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
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
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
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            sx={{ mr: 2 }}
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
                            label={quantity == undefined ? 'Add quantity' : ' '}
                            InputLabelProps={{ shrink: false }}
                            value={quantity}
                            type="number"
                            sx={{ mr: 2 }}
                            InputProps={{ sx: { borderRadius: 10 } }}
                            onChange={(e) =>
                                setQuantity(e.target.value as unknown as number)
                            }
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
                            onClick={onSubmit}
                            variant="contained"
                            startIcon={<SearchIcon />}
                            size="large"
                            sx={{
                                borderRadius: 8,
                                py: 1.7,
                                bgcolor: '#35977d',
                            }}
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
