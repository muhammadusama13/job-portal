import { Typography } from '@mui/material'
import React from 'react'

const ErrorMessage = ({ message }) => {
    return (
        <>
            <Typography sx={{ color: 'red', my: '3px', fontSize: '12px' }}>
                {message}
            </Typography>
        </>
    )
}

export default ErrorMessage