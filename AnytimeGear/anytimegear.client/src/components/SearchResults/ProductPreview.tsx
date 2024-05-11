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

function ProductPreview() {

    const AddToCartBtn = styled(Button)(({ theme }) => ({
        backgroundColor: "#35977d",
        opacity: '0.9',
        '&:hover': {
            backgroundColor: "#2c7e68",
        },

    }) );

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
              <Typography level="body-xs">Tennis Racket</Typography>
              <Link
                  href="#product-card"
                  fontWeight="md"
                  color="neutral"
                  textColor="text.primary"
                  overlay
                  endDecorator={<ArrowOutwardIcon />}
              >
                  Super Rockez A400
              </Link>

              <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: 'xl' }}
                  endDecorator={
                      <Chip component="span" size="sm" variant="soft" color="success">
                          13$/day
                      </Chip>
                  }
              >
                  72 USD
              </Typography>
              <Typography level="body-sm">
                  (Only <b>7</b> left in stock!)
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