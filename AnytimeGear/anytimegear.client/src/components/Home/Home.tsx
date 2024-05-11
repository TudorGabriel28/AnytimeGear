import { Box, Paper, Typography } from '@mui/material'
import landingImage from '../../assets/landing.jpg'
import Search from '../Shared/Search/Search'
import FAQ from './FAQ'
import { useNavigate } from 'react-router-dom'


function Home() {

    const navigate = useNavigate();
    const navigateToSearch = () => {
        
        return navigate('/search')
    }

    return (
        <>
            <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    width: '100%',
                    height: '2.5em',
                    backgroundColor: '#eeeeee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                }}
            >
                Want more details about our sports & equipment rental services?
                Call us at 1-800-555-1234
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 6,
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${landingImage})`,
                    backgroundSize: 'cover',
                    minHeight: '75vh',
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '2em 3% 2em 3%',
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 600,
                    }}
                >
                    Find your favorite <br></br>gear here!
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ color: 'white', mt: 1, fontWeight: 600 }}
                >
                    The best prices for over 1000 products
                </Typography>
                <Box sx={{ mt: 5 }}>
                    <Search
                        onSubmit={navigateToSearch}
                    />
                </Box>
            </Paper>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#eeeeee',
                    marginBottom: '10em',
                    paddingBottom: '5em',
                }}
            >
                <FAQ />
            </div>
        </>
    )
}

export default Home
