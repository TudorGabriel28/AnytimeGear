import { useCallback, useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { productService } from "../../services/product.service";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../models/product.model";
import { AspectRatio, Sheet, Skeleton } from "@mui/joy";
import { Box, Button,  Typography, styled } from "@mui/material";
import Chip from '@mui/joy/Chip';
import { rentalService } from "../../services/rental.service";
import SuccessAlert from "./SuccessAlert";

const RentButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#35977d",
    '&:hover': {
        backgroundColor: "#2c7e68",
    },

}));

function ProductDetails() {

    const { startDate, endDate, quantity, getRentalDurationInDays } = useContext(SearchContext)
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0)
    const [openAlert, setOpenAlert] = useState(false);
    
    const fetchProductAsync = async () => {
        setLoading(true)
        if (id == undefined || startDate == undefined || endDate == undefined) return

        const productId = parseInt(id)
        const product = await productService.fetchProduct(productId, startDate, endDate)
        setProduct(product)
        setTotalPrice(product.price * getRentalDurationInDays() * quantity!)
        setLoading(false)
    }

    const fetchProductCallback = useCallback(fetchProductAsync, [])

    useEffect(() => {
        fetchProductCallback()
    }, [fetchProductCallback])


    const addRentalAsync = async () => {
        if (product == undefined || startDate == undefined || endDate == undefined || quantity === null) return

        const productId = parseInt(id!)
        
        await rentalService.create({ productId, userId:1, startDate, endDate, quantity })

        setOpenAlert(true)

        setTimeout(() => {
            setOpenAlert(false)
            
        }, 5000)
    }


    return (
        <>
            <Sheet sx={{ width: '100vw', height: `calc(100vh - 68.5px)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <AspectRatio variant="plain" ratio="3/4" sx={{ minWidth: 400, borderRadius: 20, mr: 10 }}>
                        <Skeleton loading={loading}>
                            <img
                                src={
                                    loading
                                        ? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
                                        : product?.productPicture
                                }
                                alt=""
                            />
                        </Skeleton>
                    </AspectRatio>
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            {`${product?.name} ${product?.model}`}
                        </Typography>
                        <Typography variant="h4" gutterBottom sx={{mb:5} }>
                            {product?.brand}
                        </Typography>

                        {
                            product?.stock && product.stock < 5 &&
                            <Typography variant="subtitle1" sx={{ color: 'red' }}>(Only <b>{product.stock}</b> left in stock!)</Typography>
                        }
                        {
                            product?.stock && product.stock >= 5 &&
                            <Typography variant="subtitle1" color="success" sx={{ color: 'green' }}>(In stock)</Typography>
                        }

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{mr: 2} }>
                                $ {totalPrice} USD
                            </Typography>
                            <Chip component="span" size="lg" variant="soft" color="success">
                                {product?.price}$/day
                            </Chip>

                        </Box>

                        <Typography variant="subtitle1" gutterBottom sx={{ width: '70ch', my: 7 }}>
                            {product?.description}
                        </Typography>

                        

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column'
                            }} >
                                <Chip size="lg" sx={{mb: 2} }>
                                    ${product?.replacementValue} Replacement Value
                                </Chip>

                                <Chip size="lg" sx={{ mb: 2 }}>
                                    Reservation for: {startDate?.format("DD.MM.YYYY")} - {endDate?.format("DD.MM.YYYY")}
                                </Chip>
                            </Box>

                            <Box>

                                <RentButton
                                    onClick={async () => await addRentalAsync()}
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        borderRadius: 8,
                                        py: 1.5,
                                    }}
                                >
                                    Rent now
                                </RentButton>
                            </Box>

                        </Box>

                        

                    </Box>

                </Box>
                <Box sx={{ position: 'absolute', right: 50, bottom: 50 }}>
                    <SuccessAlert open={openAlert} setOpen={setOpenAlert} />
                </Box>
                
            </Sheet>
            
        </>
        
    );
}

export default ProductDetails;