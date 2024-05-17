import * as React from 'react';
import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

function SuccessAlert({ open, setOpen }: { open: boolean; setOpen: Function }) {

    

    const handleClose = () => {
        setOpen(false);
    }

  return (
      <>
          {open && (
          <Alert
              size="lg"
              color="success"
              variant="soft"
              invertedColors
              startDecorator={
                  <AspectRatio
                      variant="solid"
                      ratio="1"
                      sx={{
                          minWidth: 40,
                          borderRadius: '50%',
                          boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                      }}
                  >
                      <div>
                          <Check fontSize="xl2" />
                      </div>
                  </AspectRatio>
              }
              endDecorator={
                  <IconButton
                      variant="plain"
                      sx={{
                          '--IconButton-size': '32px',
                          transform: 'translate(0.5rem, -0.5rem)',
                      }}
                      onClick={handleClose}
                  >
                      <Close />
                  </IconButton>
              }
              sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
          >
              <div>
                  <Typography level="title-lg">Success</Typography>
                  <Typography level="body-sm">
                      You have successfully completed the rental of this product.
                  </Typography>
              </div>
              {/*<LinearProgress*/}
              {/*    variant="solid"*/}
              {/*    color="success"*/}
              {/*    value={40}*/}
              {/*    sx={{*/}
              {/*        position: 'absolute',*/}
              {/*        bottom: 0,*/}
              {/*        left: 0,*/}
              {/*        right: 0,*/}
              {/*        borderRadius: 0,*/}
              {/*    }}*/}
              {/*/>*/}
              </Alert>
          )}
      </>
  );
}

export default SuccessAlert;