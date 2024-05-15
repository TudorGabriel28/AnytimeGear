import {
    Button,
    Container,
    Divider,
    ListItemButton,
    Paper,
    Slider,
    SliderThumb,

    Typography,
    styled,
} from '@mui/material'
import { Checkbox, List, ListItem } from '@mui/joy'
import { IProductBrand } from '../../models/product.model'
import { MouseEventHandler } from 'react'

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    width: '90%',
    padding: '13px 0px',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}))

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> { }

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
    const { children, ...other } = props
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    )
}

interface IFiltersProps {
    min: number;
    max: number;
    selectedMin: number;
    selectedMax: number;
    brands: IProductBrand[];
    checkedBrandNames: string[];
    handleToggle: (brand: IProductBrand) => MouseEventHandler;
    handlePriceChange: (event: Event, newValue: number | number[]) => void;
    onClear: () => void;
}

function Filters({ min, max, selectedMin, selectedMax, brands, checkedBrandNames, handleToggle, handlePriceChange, onClear }: IFiltersProps) {

    const marks = [
        {
            value: min,
            label: `${min}$`,
        },
        {
            value: max,
            label: `${max}$`,
        },
    ]

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
                  maxWidth: '300px',
                  minWidth: '250px',
                  flexGrow: 1,
                  alignSelf: 'flex-start'
              }}
          >
              <Container
                  disableGutters
                  sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                  }}
              >
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Filter
                  </Typography>
                  <Button
                      variant="text"
                      sx={{ textTransform: 'none', borderRadius: 8 }}
                      onClick={onClear}
                  >
                      Clear all filters
                  </Button>
              </Container>
              <Divider variant="middle" flexItem sx={{ my: 2 }} />
              <Container disableGutters>
                  <Typography
                      variant="body1"
                      sx={{ fontWeight: 800, mb: 1 }}
                  >
                      Price range
                  </Typography>
                  <Container
                      disableGutters
                      sx={{
                          display: 'flex',
                          justifyContent: 'center',
                      }}
                  >
                      <AirbnbSlider
                          slots={{ thumb: AirbnbThumbComponent }}
                          getAriaLabel={(index) =>
                              index === 0
                                  ? 'Minimum price'
                                  : 'Maximum price'
                          }
                          value={[selectedMin, selectedMax]}
                          valueLabelDisplay="auto"
                          marks={marks}
                          min={min}
                          max={max}
                          onChange={handlePriceChange}
                      />
                  </Container>
              </Container>
              <Divider variant="middle" flexItem sx={{ my: 2 }} />
              <Container disableGutters>
                  <Typography
                      variant="body1"
                      sx={{ fontWeight: 800, mb: 1 }}
                  >
                      Brands
                  </Typography>

                  
                    <List size="sm">
                        {brands.map((brand) => (
                            <ListItem key={brand.name} onClick={handleToggle(brand)}>
                                <Checkbox label={brand.name} checked={checkedBrandNames.find(cbn => cbn == brand.name) !== undefined} />
                            <Typography sx={{ ml: 'auto' }}>
                                        { brand.count }
                            </Typography>
                        </ListItem>
                        ))}
                          
                    </List>
                 
              </Container>
          </Paper>


      </>
  );
}

export default Filters;