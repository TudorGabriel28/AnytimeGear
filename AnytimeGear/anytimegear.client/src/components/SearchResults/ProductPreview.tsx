import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import styled from 'styled-components';
import { IProduct } from '../../models/product.model';

const AddToCartBtn = styled(Button)(({ theme }) => ({
    backgroundColor: "#35977d",
    opacity: '0.9',
    '&:hover': {
        backgroundColor: "#2c7e68",
    },

}));

function ProductPreview({ product, getRentalDurationInDays, quantity }: { product: IProduct, getRentalDurationInDays: Function, quantity: number }) {


    return (
        <Card sx={{ width: 200, maxWidth: '100%', m: 2 }}>
            <CardOverflow>
                <AspectRatio maxHeight={200} ratio="3/4">
                  <img
                        src="https://contents.mediadecathlon.com/p170335/k$51e89d1e55b6e55f0d3468a508caba39/sq/racheta-tenis-tr100-negru-adulti.jpg?format=auto&f=1800x1800"
                        srcSet="https://contents.mediadecathlon.com/p170335/k$51e89d1e55b6e55f0d3468a508caba39/sq/racheta-tenis-tr100-negru-adulti.jpg?format=auto&f=1800x1800 2x"
                      loading="lazy"
                      alt=""
                  />
              </AspectRatio>
          </CardOverflow>
            <CardContent>
                <Typography level="body-xs">{product.brand}</Typography>
                <Typography
                    sx={{ fontWeight: '500' }}
                >
                    {`${product.name} ${product.model}`}
                </Typography>

              <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: 'xl' }}
                  endDecorator={
                      <Chip component="span" size="sm" variant="soft" color="success">
                          {product.price}$/day
                      </Chip>
                  }
              >
                    {product.price * getRentalDurationInDays() * quantity} USD
              </Typography>
                <Typography level="body-sm">
                    {
                        product.stock < 5 &&
                        <>(Only <b>{product.stock }</b> left in stock!)</>
                    }
                  
              </Typography>
          </CardContent>
            <CardOverflow>
                <AddToCartBtn variant="solid" size="lg">
                  Rent product
              </AddToCartBtn>
          </CardOverflow>
      </Card>

  );
}

export default ProductPreview;