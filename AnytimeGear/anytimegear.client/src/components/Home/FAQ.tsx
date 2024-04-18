import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function FAQ() {
    return (
        <div style={{ maxWidth: '70%' }}>
            <Typography
                variant="h3"
                sx={{ color: 'black', textAlign: 'center', fontWeight: 500, mt: 3, mb: 7 }}
            >
                Frequently asked questions
            </Typography>
            <Accordion defaultExpanded square='false' variant="outlined" sx={{ borderRadius: 5, mb: 1 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography
                        variant="h6"
                        sx={{ color: 'black', textAlign: 'center', fontWeight: 500, py: 0.5}}
                    >
                        1. How long can I rent equipment for?
                    </Typography>
                    
                </AccordionSummary>
                <AccordionDetails>
                    Rental periods vary depending on the item and your needs. Typically, rentals can be arranged for daily, weekly, or even monthly durations. You can select your preferred rental period during checkout.
                </AccordionDetails>
            </Accordion>
            <Accordion square='false' variant="outlined" sx={{ borderRadius: 5, mb: 1 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography
                        variant="h6"
                        sx={{ color: 'black', textAlign: 'center', fontWeight: 500, py: 0.5 }}
                    >
                        2. Is there a deposit required for equipment rental?
                    </Typography>
                    
                </AccordionSummary>
                <AccordionDetails>
                    Yes, we may require a deposit for certain high-value items or during peak seasons. Deposits are refunded upon return of the equipment in good condition, minus any applicable fees for damages or late returns.
                </AccordionDetails>
            </Accordion>
            <Accordion square='false' variant="outlined" sx={{ borderRadius: 5 }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <Typography
                        variant="h6"
                        sx={{ color: 'black', textAlign: 'center', fontWeight: 500, py: 0.5 }}
                    >
                        3. What happens if the equipment gets damaged during my rental period?
                    </Typography>
                    
                </AccordionSummary>
                <AccordionDetails>
                    We understand that accidents can happen. Minor wear and tear are usually covered, but significant damages may incur repair or replacement fees. It's essential to inspect the equipment upon receipt and report any existing damage to avoid liability.
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
