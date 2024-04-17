import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from 'react'

function Home() {
    const [category, setCategory] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    return (
        <>
            <Paper
                variant="outlined"
                sx={{
                    cornerRadius: '1em',
                    backgroundImage: './assets/landing.jpeg',
                    width: '90%',
                    minHeight: '60vh',
                }}
            >
                <Typography variant="h1">
                    Find your favorite gear here!
                </Typography>
                <Typography variant="subtitle1" component="h2">
                    The best prices for over 1000 products
                </Typography>
                <Paper variant="outlined">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Winter'}>Winter</MenuItem>
                            <MenuItem value={'Soccer'}>Soccer</MenuItem>
                            <MenuItem value={'Water'}>Water</MenuItem>
                        </Select>
                    </FormControl>
                    <DateTimePicker label="Add date" />
                    <DateTimePicker label="Add date" />
                    <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Paper>
            </Paper>
        </>
    )
}

export default Home
