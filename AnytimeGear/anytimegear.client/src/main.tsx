import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './utils/router'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
    </LocalizationProvider>

)
