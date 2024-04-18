import {
    Paper,
    Typography,

} from '@mui/material'
import landingImage from '../../assets/landing.jpg'
import Search from './Search'
import FAQ from './FAQ'


function Home() {
    

    return (
        <>
            <div style={{
                width: '100%',
                height: '2.5em',
                backgroundColor: '#eeeeee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                
            }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 } }>
                    Want more details about our sports & equipment rental services? Call us at 1-800-555-1234
                </Typography>
                
            </div>

            <div
                className="container"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    margin: "3em 5% 3em 5%"
                }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        borderRadius: 6,
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${landingImage})`,
                        backgroundSize: 'cover',
                        width: '100%',
                        minHeight: '65vh',
                        mb: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    
                    
                    <Typography
                        variant="h2"
                        sx={{ color: 'white', textAlign: 'center', fontWeight: 600 }}
                    >
                        Find your favorite <br></br>gear here!
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: 'white', mt: 1, fontWeight: 600 }}
                    >
                        The best prices for over 1000 products
                    </Typography>
                   <Search/>
                </Paper>

                
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#eeeeee',
                    marginBottom: '10em',
                    paddingBottom: '5em'
                }}
            >
                <FAQ />
            </div>


            
        </>
    )
}

export default Home
