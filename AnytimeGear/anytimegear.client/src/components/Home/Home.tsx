import { Paper, Typography } from '@mui/material'
import landingImage from '../../assets/landing.jpg'
import Search from './Search'
import FAQ from './FAQ'
import { useLoaderData } from 'react-router-dom'
import { categoryService } from '../../services/category.service'
import { ICategory } from '../../models/category.model'
import { subcategoryService } from '../../services/subcategory.service'
import { ISubcategory } from '../../models/subcategory.model'

export async function homeLoader() {
    const categoryData = await categoryService.fetchAll()
    const subcategoryData = await subcategoryService.fetchAll()

    return {
        categories: categoryData.items,
        subcategories: subcategoryData,
    }
}

interface IHomeLoader {
    categories: ICategory[];
    subcategories: ISubcategory[];
}

function Home() {
    const { categories, subcategories } = useLoaderData() as IHomeLoader
    

    return (
        <>
            <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                    fontWeight: 600, width: '100%',
                    height: '2.5em',
                    backgroundColor: '#eeeeee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black'
                }}
            >
                Want more details about our sports & equipment rental
                services? Call us at 1-800-555-1234
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
                    margin: '2em 3% 2em 3%'
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
                <Search
                    categories={categories}
                    subcategories={subcategories}
                />
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
