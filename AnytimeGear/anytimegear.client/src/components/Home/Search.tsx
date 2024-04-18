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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from 'react'

function Search() {

    const [category, setCategory] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    const StyledDateTimePicker = styled(DateTimePicker)(
        ({ theme }) => `
    .MuiOutlinedInput-root {
      border-radius: 10em;
    }
  `
    );

  return (
      <>
          <Paper
              variant="outlined"
              sx={{ mt: 5, p: 5, borderRadius: 5 }}
          >

              <FormControl sx={{ width: '10em', mr: 2 }}>
                  <InputLabel id="demo-simple-select-label">
                      Category
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Age"
                      onChange={handleChange}
                      sx={{ borderRadius: 10 }}
                  >
                      <MenuItem value={'Winter'}>Winter</MenuItem>
                      <MenuItem value={'Soccer'}>Soccer</MenuItem>
                      <MenuItem value={'Water'}>Water</MenuItem>
                  </Select>
              </FormControl>
              <StyledDateTimePicker
                  label="Add date"
                  sx={{ mr: 2 }}
              />
              <StyledDateTimePicker
                  label="Add date"
                  sx={{ mr: 2 }}
              />
              <TextField
                  id="outlined-number"
                  label="Add quantity"
                  type="number"
                  sx={{ mr: 2 }}
                  InputProps={{ sx: { borderRadius: 10 } }}

              />

              <Button variant="contained" startIcon={<SearchIcon />} size="large" sx={{ borderRadius: 8, py: 1.7 }}>Search</Button>
          </Paper>
      </>
  );
}

export default Search;