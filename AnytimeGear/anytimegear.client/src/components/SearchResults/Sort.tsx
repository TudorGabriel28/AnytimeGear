import {
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert'

interface ISortProps {
    value: string;
    sortOptions: ISortOption[];
    handleChange: (event: SelectChangeEvent) => void;
}

interface ISortOption {
    value: string;
    name: string;
}
function Sort({handleChange, value, sortOptions }: ISortProps) {
  return (
      <>
          <Select
              value={value}
              onChange={handleChange}
              sx={{ borderRadius: 10 }}
              size="small"
              startAdornment={
                  <InputAdornment position="start">
                      <SwapVertIcon />
                      <Typography
                          variant="body2"
                          fontWeight="700"
                      >
                          Sort by:
                      </Typography>
                  </InputAdornment>
              }
          >
              {sortOptions.map((sortOption) => {
                  return (
                      <MenuItem
                          key={sortOption.value}
                          value={sortOption.value}
                      >
                          {sortOption.name}
                      </MenuItem>
                  )
              })}
          </Select>
      </>
  );
}

export default Sort;