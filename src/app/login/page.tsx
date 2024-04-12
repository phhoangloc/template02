'use client'
import Login from '@/component/auth/login'
import React from 'react'
import Box from '@/component/grid/box'
const page = () => {
    return (
        <Box className="minHeight100vh center">
            <Login archive="admin" />
        </Box>
    )
}

export default page