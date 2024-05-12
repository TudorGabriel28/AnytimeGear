import {
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { ISortOption, SORT_OPTIONS } from '../../utils/constants';

interface ISortProps {
    selectedSortOption: ISortOption;
    handleChange: (event: SelectChangeEvent) => void;
}

function Sort({ handleChange, selectedSortOption }: ISortProps) {
  return (
      <>
          <Select
              value={selectedSortOption.title}
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
              {SORT_OPTIONS.map((sortOption) => {
                  return (
                      <MenuItem
                          key={sortOption.title}
                          value={sortOption.title}
                      >
                          {sortOption.title}
                      </MenuItem>
                  )
              })}
          </Select>
      </>
  );
}

export default Sort;