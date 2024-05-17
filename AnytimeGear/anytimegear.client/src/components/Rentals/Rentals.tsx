import { useCallback, useEffect, useState } from "react";
import RentalTable, { RentalTableData } from "./RentalTable";
import { rentalService } from "../../services/rental.service";
import { Box, Typography } from "@mui/material";

function Rentals() {

    function createData(
        id: number,
        product: string,
        price: number,
        startDate: string,
        endDate: string,
        quantity: number,
        status: string
    ): RentalTableData {
        return {
            id,
            product,
            price,
            startDate,
            endDate,
            quantity,
            status
        };
    }

    const [rentals, setRentals] = useState<RentalTableData[]>([])

    const fetchRentalsAsync = async () => {
        const rentals = await rentalService.fetchAll(1);
        const formattedRentals = rentals.map(r => createData(r.id, r.productName, r.price, r.startDate, r.endDate, r.quantity, r.completed ? 'Completed' : 'Active'))
        console.log(formattedRentals)

        setRentals(formattedRentals)

    }

    const fetchRentalsCallback = useCallback(fetchRentalsAsync, [])

    useEffect(() => {
        fetchRentalsCallback()
    }, [fetchRentalsCallback])



  return (
      <>
          <Typography variant="h4" sx={{ ml: 20, mt: 10, mb: 5, fontWeight: 700 }} gutterBottom>
              Your rentals
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ width: '70%' }}>
                  <RentalTable rows={rentals} />
                  
              </Box>
          </Box>
          
      </>
  );
}

export default Rentals;