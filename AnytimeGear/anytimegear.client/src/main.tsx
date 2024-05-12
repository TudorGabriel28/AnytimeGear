import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { router } from './utils/router'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
    </LocalizationProvider>

)
